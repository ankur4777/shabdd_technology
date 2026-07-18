import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()
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

// Nodemailer transporter (Hostinger SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  family: 4 // force IPv4
});

const sendContactEmail = async (req, res) => {
  setCorsHeaders(req, res);
  const { userName, email, subject, message } = req.body;

  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Query: ${subject}`,
      text: `Name: ${userName}\nEmail: ${email}\nMessage: ${message}`
    });
    res.send("Message sent successfully!");

    
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Message not sent");
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
