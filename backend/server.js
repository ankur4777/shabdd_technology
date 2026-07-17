import express from "express";
import nodemailer from "nodemailer";

const app = express();

const allowedOrigins = [
  "https://shabddtechnology.in/",
  "http://localhost:3000",
];

// Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).send("Origin not allowed");
  }

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());   // parse JSON body

// Nodemailer transporter (Hostinger SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,          // SSL port
  secure: true,       // true for port 465
  auth: {
    user: "test@shabddtechnology.in",   // ✅ your Hostinger mailbox
    pass: "Chasmewala@123"       // ✅ exact password from Hostinger hPanel
  }
});

// Route to send email
app.post("/contact", async (req, res) => {
  const { userName, email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: "test@shabddtechnology.in", // ✅ must be your domain mailbox
      to: "test@shabddtechnology.in",   // ✅ receiving mailbox
      replyTo: email,                   // customer’s email for replies
      subject: `New Query: ${subject}`,
      text: `Name: ${userName}\nEmail: ${email}\nMessage: ${message}`
    });

    res.send("Message sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Message not sent");
  }
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
