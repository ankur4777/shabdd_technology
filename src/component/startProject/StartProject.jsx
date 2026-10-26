import React from 'react'
import { FaArrowRight, FaEnvelope, FaPhoneAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './startProject.css'

function StartProject() {
  return (
    <section className="start-project" aria-labelledby="start-project-title">
      <div className="start-project__orb start-project__orb--cyan" aria-hidden="true" />
      <div className="start-project__orb start-project__orb--red" aria-hidden="true" />

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
          <Link className="start-project__primary" to="/contact">
            Start a Project <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="start-project__contact-links">
          <a href="mailto:info@shabddtechnology.in">
            <FaEnvelope aria-hidden="true" />
            info@shabddtechnology.in
          </a>
          <span aria-hidden="true" />
          <a href="tel:+917347673924">
            <FaPhoneAlt aria-hidden="true" />
            +91 7347673924
          </a>
        </div>
      </div>
    </section>
  )
}

export default StartProject
