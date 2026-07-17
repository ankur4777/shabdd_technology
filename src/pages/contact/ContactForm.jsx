import React, { useState } from 'react'
import axios from 'axios';
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPaperPlane,
  FaPen,
  FaRegFileAlt,
  // FaTwitter,
  FaUser,
  // FaWhatsapp,
  // FaYoutube
} from 'react-icons/fa'

import emailjs from "emailjs-com";
import { useNotification } from '../../component/globalNotification/GlobalNotification'

const socialLinks = [
  { icon: <FaFacebookF />, label: 'Facebook', href: 'https://www.facebook.com/share/1EBpFSzreB/' },
  { icon: <FaInstagram />, label: 'Instagram', href: 'https://www.instagram.com/shabddtechnology?igsh=NzEwaXl4ampma2N0' },
  // { icon: <FaTwitter />, label: 'Twitter', href: 'https://twitter.com/' },
  // { icon: <FaYoutube />, label: 'YouTube', href: 'https://www.youtube.com/' },
  // { icon: <FaWhatsapp />, label: 'WhatsApp', href: 'https://www.whatsapp.com/' },
]

function ContactForm() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const { showNotification } = useNotification()
const handleSubmit = async (e) => {
  e.preventDefault();

  const requiredFields = [formData.userName, formData.email, formData.subject];
  const hasEmptyField = requiredFields.some((value) => !value.trim());

  if (hasEmptyField) {
    showNotification({
      message: "Message not sent. Please fill all required fields.",
      image: "Global/Wrong.png", // ✅ apna correct image path do
      type: "error",
      timeout: 3000,
    });
    return;
  }

  try {
    const response = await axios.post("http://localhost:5000/send", formData);

    if (response.status === 200) {
      showNotification({
        message: "Message sent successfully!",
        image: "/Global/Correct.png",
        type: "success",
        timeout: 3000,
      });
    } else {
      showNotification({
        message: "Message not sent.",
        image: "/Global/Wrong.png",
        type: "error",
        timeout: 3000,
      });
    }
  } catch (error) {
    console.error(error);
    showNotification({
      message: "Error sending message.",
      image: "/Global/Wrong.png",
      type: "error",
      timeout: 3000,
    });
  }

  setFormData({
    userName: "",
    email: "",
    subject: "",
    message: "",
  });
};

  return (
    <div className="contact-form-panel">
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="contact-form__field">
          <span>Your Name</span>
          <div className="contact-form__control">
            <FaUser aria-hidden="true" />
            <input
              type="text"
              name="userName"
              placeholder="Enter your name"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
        </label>

        <label className="contact-form__field">
          <span>Your Email</span>
          <div className="contact-form__control">
            <FaEnvelope aria-hidden="true" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </label>

        <label className="contact-form__field">
          <span>Subject</span>
          <div className="contact-form__control contact-form__control--select">
            <FaRegFileAlt aria-hidden="true" />
            <select
              className='contact-form-dropdown'
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">Select Subject</option>
              <option value="Web Development">Web Development</option>
              <option value="Web Application">Web Application</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Meta Ads">Meta Ads</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Youtub Ads">Youtub Ads</option>
            
            </select>
          </div>
        </label>

        <label className="contact-form__field">
          <span>Your Message (Optional)</span>
          <div className="contact-form__control contact-form__control--textarea">
            <FaPen aria-hidden="true" />
            <textarea
              name="message"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </label>

        <button className="contact-form__submit" type="submit">
          <FaPaperPlane aria-hidden="true" />
          Submit
        </button>
      </form>

      <div className="contact-social">
        <h3>Follow us on social media :</h3>
        <div className="contact-social__line"></div>
        <div className="contact-social__links">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              className="contact-social__link"
              key={link.label}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactForm
