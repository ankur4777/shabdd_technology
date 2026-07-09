import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import './Contact.css'
import ContactForm from './ContactForm'

const contactDetails = [
  {
    icon: <FaEnvelope />,
    title: 'Email Address :',
    lines: ['shabddtechnology@gmail.com'],
  },
  {
    icon: <FaPhoneAlt />,
    title: 'Phone Number :',
    lines: ['+91-9543305791', '+91-7347673924'],
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Head Office Address :',
    lines: ['#232, 4th Floor, Street 14, Gulab Vatika, Loni Ghaziabad, 201102'],
  },
  {
    icon: <FaMapMarkerAlt />,
    title: 'Canada Branch Address :',
    lines: ['6565 Kildare Rd Cote Saint Luc, Montreal, QC H4W 1B6'],
  },
]

function Contact() {
  return (<>
    <section className="contact-hero" aria-labelledby="contact-title">
      <h1 id="contact-title" className="contact-hero__sr-title">Contact Us</h1>
      <img
        className="contact-hero__image"
        src="/Contact/9daa566f-c843-4618-91bf-2ff0964f3873.png"
        alt=""
        aria-hidden="true"
      />
    </section>
    <div className='contact-container'>

      <div className='contact-left-text'>
        <h1>Feel Free To <span>Contact </span>  & Get In Touch !</h1>
        <p style={{ fontSize: 'clamp(1rem, 1vw, 1rem)', textAlign: 'justify' }}>
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
                    <p key={line}>{line}</p>
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
