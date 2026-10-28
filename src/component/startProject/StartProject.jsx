import React from 'react'
import { FaArrowRight, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import './startProject.css'

function StartProject() {
  return (
    <section className="start-project" aria-labelledby="start-project-title">
      <div className="start-project__wash start-project__wash--left" aria-hidden="true" />
      <div className="start-project__wash start-project__wash--right" aria-hidden="true" />

      <div className="start-project__content">
        <div className="start-project__eyebrow">
          <span aria-hidden="true" />
          SHABDD TECHNOLOGY
          <span aria-hidden="true" />
        </div>

        <h1 id="start-project-title">
          Tell us what
          <br />
          you want to <span>build.</span>
        </h1>

        <p className="start-project__description">
          From websites and software to AI chatbot solutions, Shabdd Technology helps turn your ideas into digital products.
        </p>

        <div className="start-project__actions">
          <a
            className="start-project__primary"
            href="https://wa.me/16048340062?text=Hello%20Shabdd%20Technology%2C%20I%20want%20to%20start%20a%20project."
            target="_blank"
            rel="noreferrer"
          >
            Start a Project <FaArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="start-project__contact-links">
          <a href="mailto:info@shabddtechnology.ca">
            <FaEnvelope aria-hidden="true" />
           formshabddtechnology@gmail.com
          </a>
          <span aria-hidden="true" />
          <a href="tel:+917347673924">
            <FaPhoneAlt aria-hidden="true" />
            +1 (604) 834-0062
          </a>
        </div>
      </div>

    </section>
  )
}

export default StartProject
