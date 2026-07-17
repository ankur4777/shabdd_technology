import express from "express";
import nodemailer from "nodemailer";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// ✅ Correct spelling: transporter
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465, // SSL
  secure: true,
  auth: {
    user: "test@shabddtechnology.in",   // your Hostinger mailbox
    pass: "Chasmewala@123"             // your Hostinger mailbox password
  }
});

app.post("/send", async (req, res) => {
  const { userName, email, subject, message } = req.body;

  try {
  await transporter.sendMail({
  from: "test@shabddtechnology.in", // ✅ must be your domain mailbox
  to: "test@shabddtechnology.in",   // receiving mailbox
  replyTo: email,                   // customer’s email for replies
  subject: `New Query: ${subject}`,
  text: `Name: ${userName}\nEmail: ${email}\nMessage: ${message}`
});


    // ✅ Use res.send instead of end
    res.send("Message sent successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Message not sent");
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
