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
    console.error("Error sending email:", {
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      message: err.message,
      details: err.details
    });
    res.status(500).json({
      message: "Message not sent",
      error: err.code || err.responseCode || "SMTP_ERROR",
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
