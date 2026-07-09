import React, { useState } from 'react'
import Banner from '../Banner'
import servicesData from '../serviceData'
import { FaHeadset, FaLaptopCode, FaSearch, FaTools } from 'react-icons/fa'
import { MdKeyboardArrowRight } from 'react-icons/md'
import "./WebApplication.css"

const processSteps = [
  {
    title: 'Discovery & Planning',
    icon: <FaSearch />,
    detail: 'We define your goals, user needs, and technical requirements for a strategic roadmap.',
  },
  {
    title: 'UI/UX Design',
    icon: <FaLaptopCode />,
    detail: 'We design sleek, intuitive interfaces that maximize engagement and conversion rates.',
  },
  {
    title: 'Development & Testing',
    icon: <FaTools />,
    detail: 'We develop robust applications with modern frameworks and conduct rigorous testing for security and speed.',
  },
  {
    title: 'Deployment & Support',
    icon: <FaHeadset />,
    detail: 'Seamless cloud deployment with ongoing monitoring, updates, and performance optimization.',
  },
]

export function WebApplicationProcess() {
  const [activeStep, setActiveStep] = useState(null)

  const toggleStep = (index) => {
    setActiveStep((currentStep) => currentStep === index ? null : index)
  }

  return (
    <section className="webApplication-process-banner" aria-label="Our web app development process">
      <div className="webApplication-process-content">
        <div className="webApplication-process-copy">
          <h2>Our Web App Development Process</h2>
          <div className="webApplication-process-line" />
          <p>
            Combining agile development, cloud scalability, and DevOps automation
            to build <span>future-proof</span> applications.
          </p>

          <div className="webApplication-process-list">
            {processSteps.map((step, index) => (
              <article className={`webApplication-process-item ${activeStep === index ? 'is-open' : ''}`} key={step.title}>
                <button
                  className="webApplication-process-step"
                  type="button"
                  aria-expanded={activeStep === index}
                  onClick={() => toggleStep(index)}
                >
                  <span className="webApplication-process-icon">{step.icon}</span>
                  <strong>{step.title}</strong>
                  <MdKeyboardArrowRight className="webApplication-process-arrow" />
                </button>
                <p className="webApplication-process-detail">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="webApplication-process-art" aria-hidden="true">
          <img
            src="/webApplication/ChatGPT%20Image%20Jul%203%2C%202026%2C%2010_05_27%20AM.png"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}

function WebApplication() {
  return (
    <div>
      <Banner {...servicesData['web-application']} />

      <div className='webApplication-container'>
        <img src="/webApplication/96b0e681-2c80-4656-8ade-81013c9665ea.png" alt="Web application illustration" />
        <div className="webApplication-right-text">
          <h1>Building Interactive, Scalable, and Secure <span>Online Solutions</span> </h1>
          <h5>Web application development is all about building dynamic, browser-based software designed to meet your unique business goals.

Unlike static websites, our web apps deliver interactive functionality, real-time data processing, and seamless user experiences that drive efficiency and engagement.</h5>
        </div>
      </div>
    </div>
  )
}

export default WebApplication
