import express from "express";
import nodemailer from "nodemailer";

const app = express();

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;

  if (
    origin === "https://shabddtechnology.in" ||
    origin === "http://localhost:3000"
  ) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

app.use(express.json());   // parse JSON body

// Nodemailer transporter (Hostinger SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,          // SSL port
  secure: true,       // true for port 465
  auth: {
    user: "test@shabddtechnology.in",   // ✅ your Hostinger mailbox
    pass: "Chasmewala@123"       // ✅ exact password from Hostinger hPanel
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000
});

const sendContactEmail = async (req, res) => {
  setCorsHeaders(req, res);

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
};

// Route to send email
app.options("/contact", (req, res) => {
  setCorsHeaders(req, res);
  res.sendStatus(204);
});

app.post("/contact", sendContactEmail);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
