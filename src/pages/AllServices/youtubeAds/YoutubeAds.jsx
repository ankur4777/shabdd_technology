import React from 'react'
import Banner from '../Banner'
import servicesData from '../serviceData'
import {
  FaChartLine,
  FaClipboardList,
  FaDollarSign,
  FaGear,
  FaLightbulb,
  FaPeopleGroup,
  FaPlay,
} from 'react-icons/fa6'
import './YoutubeAds.css'

const youtubeProcessSteps = [
  {
    icon: <FaLightbulb />,
    number: '01',
    title: 'Brainstorming Ideas',
    text: 'We study your brand, audience, and goals to shape high-impact YouTube ad ideas with real purpose.',
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
    title: 'Ad Optimization',
    text: 'We refine campaigns with real-time analytics, adjusting placements, creatives, and bids to improve performance.',
  },
  {
    icon: <FaClipboardList />,
    number: '04',
    title: 'Delivery and Scaling',
    text: 'We provide in-depth insights and scale top-performing ads to maximize long-term growth.',
  },
]

const youtubeMarketHighlights = [
  {
    icon: <FaPeopleGroup />,
    title: 'Audience Focused',
  },
  {
    icon: <FaChartLine />,
    title: 'Higher Conversions',
  },
  {
    icon: <FaPlay />,
    title: 'YouTube Expertise',
  },
  {
    icon: <FaDollarSign />,
    title: 'Better ROI',
  },
]

function YoutubeAds() {
  return (
    <div>
      <Banner {...servicesData['youtube-ads']} />

      <section className="youtube-market-section" aria-label="YouTube ads market disruption">
        <div className="youtube-market-visual">
          <span className="youtube-market-dots youtube-market-dots-top" />
          <span className="youtube-market-dots youtube-market-dots-bottom" />
          <div className="youtube-market-image-card">
            <img src="/youtub/163d2a48-cef0-498c-a545-9003eae21a72.png" alt="YouTube ads campaign visual" />
          </div>
        </div>

        <div className="youtube-market-content">
          <h2>
            <span>YouTube Ads</span> Capable Of
            <strong>Disrupting the Market</strong>
          </h2>
          <i />

          <p>
            We create data-driven, audience-focused YouTube ad campaigns designed
            to maximize engagement, boost conversions, and optimize ROI.
          </p>

          <p>
            From brand awareness to direct response marketing, our expertise in ad
            formats, audience segmentation, and bidding strategies ensures your
            message reaches the right viewers at the right time.
          </p>

          <div className="youtube-market-highlights">
            {youtubeMarketHighlights.map((item) => (
              <div className="youtube-market-highlight" key={item.title}>
                <span>{item.icon}</span>
                <strong>{item.title}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="youtube-timeline-section" aria-label="YouTube ads process">
        <div className="youtube-timeline-header">
          <h2>
            Our <span>YouTube Ad Campaign </span> Process
          </h2>
          <strong />
        </div>

        <div className="youtube-timeline-list">
          {youtubeProcessSteps.map((step, index) => (
            <article className="youtube-timeline-item" key={step.number}>
              <div className="youtube-timeline-icon-wrap">
                {index < youtubeProcessSteps.length - 1 && <span className="youtube-timeline-curve" />}
                <span className="youtube-timeline-icon">{step.icon}</span>
              </div>

              <strong className="youtube-timeline-number">{step.number}</strong>
              <span className="youtube-timeline-divider" />
              <div className="youtube-timeline-copy">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default YoutubeAds
