import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  requireTLS: smtpPort === 587,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  family: 4
});

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

const sendContactEmail = async (req, res) => {
  setCorsHeaders(req, res);
  const { userName, email, subject, message } = req.body;

  try {
    await withTimeout(transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Query: ${subject}`,
      text: `Name: ${userName}\nEmail: ${email}\nMessage: ${message}`
    }), 25000);
    res.send("Message sent successfully!");
  } catch (err) {
    console.error("Error sending email:", {
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
      message: err.message
    });
    res.status(500).json({
      message: "Message not sent",
      error: err.code || err.responseCode || "SMTP_ERROR"
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
