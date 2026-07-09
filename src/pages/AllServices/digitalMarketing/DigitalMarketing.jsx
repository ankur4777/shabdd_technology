import React from 'react'
import Banner from '../Banner'
import servicesData from '../serviceData'
import { FaBullseye, FaChartColumn, FaChartLine, FaUsers } from 'react-icons/fa6'
import './DigitalMarketing.css'

function DigitalMarketing() {
  return (
    <div>
      <Banner {...servicesData['digital-marketing']} />

      <section className="digital-growth-section" aria-label="Digital marketing enrollment goals">
        <div className="digital-growth-visual">
          <span className="digital-growth-dots digital-growth-dots-top" />
          <span className="digital-growth-dots digital-growth-dots-bottom" />
          <img
            src="/digital/Black-Purple-Modern-Website-Design-And-Development-Banner-1-1-1024x512.png"
            alt="Digital marketing team reviewing campaign performance"
          />
          <div className="digital-floating-card digital-floating-card-top">
            <FaChartLine />
            <strong>High Precision</strong>
            <span>Targeting</span>
          </div>
          <div className="digital-floating-card digital-floating-card-left">
            <FaUsers />
            <strong>Qualified</strong>
            <span>Leads</span>
          </div>
          <div className="digital-floating-card digital-floating-card-right">
            <FaBullseye />
            <strong>Better</strong>
            <span>Conversions</span>
          </div>
        </div>

        <div className="digital-growth-content">
          <h2>
            Achieve Your Enrollments
            <span>Goals Faster</span>
          </h2>
          <p>
            Target your prospects with high precision data to drive qualified leads
            through digital marketing strategies tailored to your specific programs.
          </p>

          <div className="digital-growth-feature">
            <span>
              <FaBullseye />
            </span>
            <div>
              <h3>Precise Targeting</h3>
              <p>Reach the right audience with advanced targeting and segmentation.</p>
            </div>
          </div>

          <div className="digital-growth-feature">
            <span>
              <FaChartColumn />
            </span>
            <div>
              <h3>Data-Driven Strategy</h3>
              <p>Make smarter decisions backed by real-time insights and analytics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DigitalMarketing
