import React, { useState } from 'react'
import './FSQ.css'
import {
  FaBullseye,
  FaChartLine,
  FaCode,
  FaEnvelope,
  FaGlobe,
  FaHeadset,
  FaPlus,
  FaRegCommentDots,
  FaShieldAlt,
  FaUsers,
} from 'react-icons/fa'

const faqItems = [
  {
    question: 'What services does Shabdd Technology offer?',
    answer: 'Shabdd Technology offers web development, web applications, ERP software solutions, digital marketing, SEO, Meta Ads, graphic designing, YouTube Ads, lead generation, and website maintenance services.',
    icon: <FaCode />,
    tone: 'red',
  },
  {
    question: 'Who are the founders of Shabdd Technology?',
    answer: 'Founder details can be added here with a short introduction about the people behind Shabdd Technology.',
    icon: <FaUsers />,
    tone: 'blue',
  },
  {
    question: 'What is ERP software, and how can it benefit my business?',
    answer: 'ERP software helps manage sales, inventory, accounts, customers, reporting, and daily operations from one centralized system, making your business easier to control and scale.',
    icon: <FaChartLine />,
    tone: 'green',
  },
  {
    question: 'What platforms do you support for web development?',
    answer: 'We create responsive websites and web applications that work smoothly across desktop, tablet, and mobile devices using modern web technologies.',
    icon: <FaGlobe />,
    tone: 'purple',
  },
  {
    question: 'What is lead generation, and how does Shabdd help?',
    answer: 'Lead generation helps bring interested customers to your business through campaigns, landing pages, forms, tracking, and follow-up systems.',
    icon: <FaBullseye />,
    tone: 'orange',
  },
  {
    question: 'Can Shabdd Technology help with ongoing website maintenance?',
    answer: 'Yes. We help with website updates, bug fixes, performance checks, security improvements, and regular support after launch.',
    icon: <FaShieldAlt />,
    tone: 'cyan',
  },
]

function FSQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleToggle = (index) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? null : index))
  }

  return (
    <section className="fsq-section">
      <div className="fsq-shell">
        <div className="fsq-main">
          <div className="fsq-copy">
            <span className="fsq-eyebrow">FAQ</span>
            <h2>
              Frequently Asked
              <span>Questions</span>
            </h2>
            <p>Find quick answers to the most common questions about our services and solutions.</p>

            <div className="fsq-list" aria-label="Frequently asked questions">
              {faqItems.map((item, index) => {
                const isOpen = activeIndex === index

                return (
                  <div className={`fsq-item fsq-tone-${item.tone} ${isOpen ? 'active' : ''}`} key={item.question}>
                    <button
                      className={`fsq-question fsq-tone-${item.tone}`}
                      type="button"
                      onClick={() => handleToggle(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="fsq-question-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span>{item.question}</span>
                      <FaPlus className="fsq-plus" aria-hidden="true" />
                    </button>

                    <div className="fsq-answer" aria-hidden={!isOpen}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="fsq-visual" aria-hidden="true">
            <span className="fsq-orbit" />
            <span className="fsq-dot-grid" />
            <span className="fsq-blue-dot" />
            <span className="fsq-green-dot" />
            <span className="fsq-orange-dot" />
            <span className="fsq-question-bubble">?</span>
            <span className="fsq-brand-orb">
              <span className="fsq-brand-mark">
                <span />
                <span />
              </span>
            </span>
            <span className="fsq-chat-bubble">
              <FaRegCommentDots />
            </span>
            <span className="fsq-ground-glow" />
          </div>
        </div>

        <div className="fsq-contact">
          <span className="fsq-contact-icon" aria-hidden="true">
            <FaHeadset />
          </span>
          <div className="fsq-contact-copy">
            <h3>Still have questions?</h3>
            <p>We're here to help you. Get in touch with our team.</p>
          </div>
          <a href="/contact" className="fsq-contact-button">
            <FaEnvelope aria-hidden="true" />
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}

export default FSQ
