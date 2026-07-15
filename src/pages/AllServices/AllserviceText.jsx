import React from 'react'
import './AllserviceText.css'

function AllserviceText({ serviceText }) {
  if (!serviceText) {
    return null
  }

  const accents = [
    '227, 18, 82',
    '242, 58, 47',
    '47, 149, 214',
    '75, 183, 54',
    '237, 51, 42',
    '245, 159, 20',
  ]

  return (
    <section className="allservice-text">
      <div className="allservice-text-heading">
        <h2>
          {serviceText.title.split(' ')[0]}{' '}
          <span>{serviceText.title.split(' ').slice(1).join(' ')}</span>
        </h2>
        <div className="allservice-title-line" />
        <p>{serviceText.intro}</p>
      </div>

      <div className="allservice-card-grid">
        {serviceText.cards.map((card, index) => (
          <article
            className="allservice-card"
            key={card.title}
            style={{ '--allservice-accent': accents[index % accents.length] }}
          >
            <span className="allservice-card-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="allservice-card-icon">
              <img src={card.icon} alt="" />
            </div>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <strong className='h2-italic'>Proudly delivered by ShabdD Technology.</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AllserviceText
