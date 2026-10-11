import React from 'react'
import {
  FaBookOpen,
  FaCartShopping,
  FaChartLine,
  FaHeartPulse,
  FaLightbulb,
  FaMagnifyingGlass,
  FaPencil,
  FaRocket,
} from 'react-icons/fa6'
import './ServiceShowcaseSection.css'

const iconMap = {
  book: <FaBookOpen />,
  cart: <FaCartShopping />,
  chart: <FaChartLine />,
  heart: <FaHeartPulse />,
  lightbulb: <FaLightbulb />,
  pencil: <FaPencil />,
  research: <FaMagnifyingGlass />,
  rocket: <FaRocket />,
}

const iconThemeMap = {
  book: '47, 149, 214',
  cart: '47, 149, 214',
  chart: '75, 183, 54',
  heart: '238, 42, 123',
  lightbulb: '245, 159, 20',
  pencil: '237, 51, 42',
  research: '47, 149, 214',
  rocket: '242, 58, 47',
}

function ServiceShowcaseSection({ data }) {
  if (!data) {
    return null
  }

  const isProcess = data.variant === 'process'

  return (
    <section className={`service-showcase-section ${isProcess ? 'process' : ''}`} aria-label={data.ariaLabel || data.eyebrow}>
      <div className="service-showcase-shell">
        {data.eyebrow && (
          <div className="service-showcase-eyebrow">
            <span />
            <strong>{data.eyebrow}</strong>
            <span />
          </div>
        )}

        <div className="service-showcase-header">
          <h2>
            {data.titlePrefix}
            {data.inlineHighlight && <span className="inline">{data.inlineHighlight}</span>}
            {data.titleSuffix}
            {!data.titlePrefix && data.title}
            {data.highlight && <span>{data.highlight}</span>}
          </h2>
          {data.intro && <p className="for-p-tag">{data.intro}</p>}
        </div>

        <div className="service-showcase-grid">
          {data.cards.map((card, index) => (
            <article
              className="service-showcase-card"
              key={card.title}
              style={{ '--showcase-accent': iconThemeMap[card.icon] || iconThemeMap.chart }}
            >
              <span className="service-showcase-icon">
                {iconMap[card.icon] || iconMap.chart}
                {isProcess && <em>{String(index + 1).padStart(2, '0')}</em>}
              </span>
              <h3>{card.title}</h3>
              <span className="service-showcase-line" />
              <p className="for-p-tag">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceShowcaseSection
