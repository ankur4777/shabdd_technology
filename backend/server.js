import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "node:dns/promises";

dotenv.config();

const app = express();

const allowedOrigins = new Set([
  process.env.CORS_ORIGIN,
  "https://shabddtechnology.in",
  "https://www.shabddtechnology.in",
  "http://localhost:3000"
].filter(Boolean));

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

const smtpPort = Number(process.env.SMTP_PORT) || 587;
const contactRecipient = process.env.CONTACT_RECIPIENT || "lk3400961@gmail.com";
const smtpHost = process.env.SMTP_HOST;
const web3FormsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
let smtpIPv4;

const getSmtpIPv4 = async () => {
  if (smtpIPv4) return smtpIPv4;
  const result = await dns.lookup(smtpHost, { family: 4 });
  smtpIPv4 = result.address;
  return smtpIPv4;
};

const createTransporter = async (port) => {
  const host = await getSmtpIPv4();

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    family: 4,
    tls: {
      servername: smtpHost
    }
  });
};

const smtpPortsToTry = [...new Set([smtpPort, 465, 587])];

const withTimeout = (promise, timeoutMs) => {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      const error = new Error("SMTP request timed out");
      error.code = "SMTP_TIMEOUT";
      reject(error);
    }, timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
};

const sendMailWithFallback = async (mailOptions) => {
  const errors = [];

  for (const port of smtpPortsToTry) {
    try {
      const transporter = await createTransporter(port);
      await withTimeout(transporter.sendMail(mailOptions), 25000);
      return { port };
    } catch (err) {
      errors.push({
        port,
        secure: port === 465,
        code: err.code,
        command: err.command,
        responseCode: err.responseCode,
        message: err.message
      });
    }
  }

  const error = new Error("All SMTP attempts failed");
  error.code = "SMTP_ALL_FAILED";
  error.details = errors;
  throw error;
};

const sendViaFormSubmit = async ({ userName, email, subject, message }) => {
  const response = await fetch(`https://formsubmit.co/ajax/${contactRecipient}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: userName,
      email,
      subject: `New Query: ${subject}`,
      message: `Name: ${userName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      _subject: `New Query: ${subject}`,
      _template: "table",
      _captcha: "false"
    })
  });

  const text = await response.text();
  if (!response.ok) {
    const error = new Error(text || "FormSubmit request failed");
    error.code = `FORMSUBMIT_${response.status}`;
    throw error;
  }

  return text;
};

const sendViaWeb3Forms = async ({ userName, email, subject, message }) => {
  if (!web3FormsAccessKey) {
    const error = new Error("WEB3FORMS_ACCESS_KEY is not configured");
    error.code = "WEB3FORMS_NOT_CONFIGURED";
    throw error;
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      access_key: web3FormsAccessKey,
      from_name: userName,
      email,
      subject: `New Query: ${subject}`,
      message: `Name: ${userName}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      replyto: email,
      to: contactRecipient
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    const error = new Error(data.message || "Web3Forms request failed");
    error.code = `WEB3FORMS_${response.status}`;
    throw error;
  }

  return data;
};

const sendContactEmail = async (req, res) => {
  setCorsHeaders(req, res);
  const { userName, email, subject, message } = req.body;

  try {
    const result = await sendMailWithFallback({
      from: process.env.EMAIL_USER,
      to: contactRecipient,
      replyTo: email,
      subject: `New Query: ${subject}`,
      text: `Name: ${userName}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({
      message: "Message sent successfully!",
      smtpPort: result.port
    });
  } catch (err) {
    try {
      await withTimeout(sendViaWeb3Forms({ userName, email, subject, message }), 25000);
      console.warn("SMTP failed; message sent through Web3Forms fallback:", {
        smtpError: err.code,
        smtpDetails: err.details
      });
      res.json({
        message: "Message sent successfully!",
        provider: "web3forms",
        smtpFallbackError: err.code
      });
      return;
    } catch (web3FormsErr) {
      try {
        await withTimeout(sendViaFormSubmit({ userName, email, subject, message }), 25000);
        console.warn("SMTP and Web3Forms failed; message sent through FormSubmit fallback:", {
          smtpError: err.code,
          web3FormsError: web3FormsErr.code
        });
        res.json({
          message: "Message sent successfully!",
          provider: "formsubmit",
          smtpFallbackError: err.code,
          web3FormsFallbackError: web3FormsErr.code
        });
        return;
      } catch (formSubmitErr) {
        err.fallback = {
          web3Forms: {
            code: web3FormsErr.code,
            message: web3FormsErr.message
          },
          formSubmit: {
            code: formSubmitErr.code,
            message: formSubmitErr.message
          }
        };
      };
    }

    console.error("Error sending email:", {
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      message: err.message,
      details: err.details,
      fallback: err.fallback
    });
    res.status(500).json({
      message: "Message not sent",
      error: err.code || err.responseCode || "SMTP_ERROR",
      fallback: err.fallback,
      details: err.details || [{
        code: err.code,
        command: err.command,
        responseCode: err.responseCode,
        message: err.message
      }]
    });
  }
};

app.options("/contact", (req, res) => {
  setCorsHeaders(req, res);
  res.sendStatus(204);
});

app.post("/contact", sendContactEmail);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
