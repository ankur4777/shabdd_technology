import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Allowed origins (env + defaults)
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

// ✅ Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// ✅ Nodemailer transporter (587 + IPv4)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,              // smtp.hostinger.com
  port: Number(process.env.SMTP_PORT),      // 587
  secure: false,                            // ✅ 587 ke liye false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  family: 4 // ✅ force IPv4 only
});

// ✅ Contact form handler
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

// ✅ Handle preflight request
app.options("/contact", (req, res) => {
  setCorsHeaders(req, res);
  res.sendStatus(204);
});

// ✅ POST route
app.post("/contact", sendContactEmail);

// ✅ Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
