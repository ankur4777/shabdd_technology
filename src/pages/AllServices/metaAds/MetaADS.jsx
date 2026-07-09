import React from 'react'
import Banner from '../Banner'
import servicesData from '../serviceData'
import {
  FaBullseye,
  FaChartLine,
  FaLightbulb,
  FaRocket,
  FaUsers,
} from 'react-icons/fa6'
import './MetaADS.css'

const optimizationSteps = [
  {
    icon: <FaLightbulb />,
    title: 'Creative Brainstorming & Strategy',
    text: 'We analyze trends, competitors, and audience data to build a winning ad strategy.',
  },
  {
    icon: <FaBullseye />,
    title: 'Precision Campaign Setup',
    text: 'We set up highly targeted campaigns with the right audience, placements, and budgets.',
  },
  {
    icon: <FaChartLine />,
    title: 'Continuous Optimization',
    text: 'We refine messaging, visuals, and bid strategies to improve ad performance and lower costs.',
  },
  {
    icon: <FaRocket />,
    title: 'Performance Tracking & Scaling',
    text: 'We identify winning ads and scale them to maximize growth and ROI.',
  },
]

function MetaADS() {
  return (
    <div>
      <Banner {...servicesData['meta-ads']} />

      <section className="meta-growth-section" aria-label="Meta ads profitable growth">
        <div className="meta-growth-visual">
          <span className="meta-growth-dots meta-growth-dots-top" />
          <span className="meta-growth-dots meta-growth-dots-bottom" />
          <img src="/background/Meta Ads.png" className="meta-visual-image" alt="Meta ads campaign visual" />
        </div>

        <div className="meta-growth-content">
          <span className="meta-growth-kicker" />
          <h2>
            Convert Ad Spend into
            <span>Profitable Growth</span>
          </h2>
          <div className="meta-growth-line" />

          <div className="meta-growth-copy">
            <span><FaUsers /></span>
            <p>
              We create ROI-focused Meta ad campaigns that put your brand in
              front of the right audience at the right time.
            </p>
          </div>

          <div className="meta-growth-copy">
            <span><FaRocket /></span>
            <p>
              Using advanced targeting, strategic bidding, and conversion-optimized
              creatives, we help businesses maximize engagement, increase revenue,
              and dominate their market.
            </p>
          </div>
        </div>
      </section>

      <section className="meta-optimization-section" aria-label="Meta ads optimization process">
        <div className="meta-optimization-content">
          <h2>
            From Setup to Scaling
            <span>We Optimize Every Step</span>
          </h2>
          <p className="meta-optimization-intro">
            We take a results-driven, data-backed approach to maximize performance,
            minimize waste, and scale profitable campaigns for long-term success.
          </p>

          <div className="meta-optimization-list">
            {optimizationSteps.map((step) => (
              <article className="meta-optimization-step" key={step.title}>
                <span className="meta-optimization-icon">{step.icon}</span>
                <div className='meta-text-left'>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="meta-optimization-image" aria-hidden="true">
          <img
            src="/meta/Screenshot 2026-07-03 125555.png"
            alt=""
          />
        </div>
      </section>
    </div>
  )
}

export default MetaADS
