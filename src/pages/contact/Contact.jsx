import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import './Contact.css'
import ContactForm from './ContactForm'

const contactDetails = [
  {
    icon: <FaEnvelope />,
    title: 'Email Address',
    lines: ['shabddtechnology@gmail.com'],
  },
  {
    icon: <FaPhoneAlt />,
    title: 'Phone Number',
    lines: ['+91-9543305791', '+91-7347673924'],
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Head Office Address',
    lines: ['#232, 4th Floor, Street 14, Gulab Vatika, Loni Ghaziabad, 201102'],
  },

]

function Contact() {
  return (<>
    <section className="contact-hero" aria-labelledby="contact-title">
      <div className="contact-hero__content">
        <div className="contact-hero__copy">
          <div className="contact-hero__pill">
            <span />
            Get In Touch
          </div>
          <h1 id="contact-title">
            Contact <span>Us</span>
          </h1>
          <div className="contact-hero__line" />
          <p className="for-p-tag">
            We’re here to help! Whether you have a question, need support, or want to discuss a project, our team is
            ready to assist you.
          </p>
        </div>

        <div className="contact-hero__visual">
          <img
            className="contact-hero__illustration"
            src="/Contact/contact-hero-illustration.png"
            alt="Envelope with email symbol and paper plane"
          />
        </div>
      </div>
    </section>
    <div className='contact-container'>

      <div className='contact-left-text'>
        <h2>Feel Free To <span>Contact </span>  & Get In Touch !</h2>
        <p className="for-p-tag" style={{ fontSize: 'clamp(1rem, 1vw, 1rem)', textAlign: 'justify' }}>
          Ready to take your digital marketing to the next level? Whether you're looking to enhance your online presence, boost traffic, or drive more conversions, Shabdd Technology is here to help. Our dedicated team of digital marketing professionals is ready to tailor strategies that meet your unique business goals.

          Have questions or need a consultation? We'd love to hear from you! Reach out today and discover how we can transform your business with innovative digital marketing solutions.
        </p>


        <div className="contact-animation-outer">
          <div className="contact-animation-inner">
          </div>
        </div>

        <div className="contact-info-list">
          {contactDetails.map((item) => (
            <div className="contact-info-card" key={item.title}>
              <div className="contact-info-card__icon" aria-hidden="true">
                {item.icon}
              </div>
              <div className="contact-info-card__content">
                <h2>{item.title}</h2>
                <div className={item.title.includes('Phone') ? 'contact-info-card__phones' : ''}>
                  {item.lines.map((line) => (
                    <p className="for-p-tag" key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>

      <ContactForm/>
    </div>
  </>
  )
}

export default Contact
