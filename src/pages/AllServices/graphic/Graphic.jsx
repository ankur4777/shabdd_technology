import React from 'react'
import Banner from '../Banner'
import servicesData from '../serviceData'
import {
  FaBullseye,
  FaChartLine,
  FaClipboardList,
  FaDisplay,
  FaGear,
  FaLightbulb,
  FaPalette,
  FaPenNib,
} from 'react-icons/fa6'
import './Graphic.css'

const graphicHighlights = [
  {
    icon: <FaPenNib />,
    title: 'Creative Designs',
  },
  {
    icon: <FaDisplay />,
    title: 'Brand Focused',
  },
  {
    icon: <FaPalette />,
    title: 'Eye-Catching Visuals',
  },
  {
    icon: <FaBullseye />,
    title: 'Audience Driven',
  },
]

const graphicProcess = [
  {
    icon: <FaLightbulb />,
    number: '01',
    title: 'Brainstorming Ideas',
    text: 'We study your brand, audience, and goals to shape creative design ideas with real purpose.',
  },
  {
    icon: <FaGear />,
    number: '02',
    title: 'Creative Set Up',
    text: 'We configure targeting, bidding strategies, and ad formats for maximum engagement and efficiency.',
  },
  {
    icon: <FaChartLine />,
    number: '03',
    title: 'Design Optimization',
    text: 'We refine campaigns with real-time analytics, adjusting placements, creatives, and bids to improve performance.',
  },
  {
    icon: <FaClipboardList />,
    number: '04',
    title: 'Delivery and Scaling',
    text: 'We provide in-depth insights and scale top-performing ads to maximize long-term growth.',
  },
]

function Graphic() {
  return (
    <div>
      <Banner {...servicesData['graphic-designing']} />

      <section className="graphic-story-section" aria-label="Graphic design visual storytelling">
        <div className="graphic-story-visual">
          <span className="graphic-story-dots graphic-story-dots-top" />
          <span className="graphic-story-dots graphic-story-dots-bottom" />
          <div className="graphic-story-image-card">
            <img src="/background/Graphic designer.png" alt="Graphic design creative visual" />
          </div>
        </div>

        <div className="graphic-story-content">
          <span className="graphic-story-kicker" />
          <h2>
            Crafting Visuals
            <span>That Tell Your Story</span>
          </h2>

          <p>
            Three Apples Graphic Design services go beyond aesthetics to create
            functional, visually stunning content that captivate users, showing
            your perspective into their lens.
          </p>

          <p>
            With the latest design practices, we help you create an engaging
            digital experience that reflects your brand and meets your audience's needs.
          </p>

          <div className="graphic-story-highlights">
            {graphicHighlights.map((item) => (
              <div className="graphic-story-highlight" key={item.title}>
                <span>{item.icon}</span>
                <strong>{item.title}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export function GraphicProcess() {
  return (
    <section className="graphic-process-section" aria-label="Graphic design process">
      <div className="graphic-process-header">
        <h2>
          Our <span>Graphic</span> Design <span>Process</span>
        </h2>
        <strong />
      </div>

      <div className="graphic-process-list">
        {graphicProcess.map((step, index) => (
          <article className="graphic-process-item" key={step.number}>
            <div className="graphic-process-icon-wrap">
              {index < graphicProcess.length - 1 && <span className="graphic-process-curve" />}
              <span className="graphic-process-icon">{step.icon}</span>
            </div>

            <strong className="graphic-process-number">{step.number}</strong>
            <span className="graphic-process-divider" />
            <div className="graphic-process-copy">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Graphic
