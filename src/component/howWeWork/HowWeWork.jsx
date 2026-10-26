import React from 'react'
import './howWeWork.css'

const processSteps = [
  {
    number: '01',
    title: 'Talk',
    description: 'Tell us the problem in your own words. We ask until we understand the work, not just the feature list.',
  },
  {
    number: '02',
    title: 'Quote',
    description: 'Scope, timeline and one fixed price, in writing, before any work begins.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'You see it working as it grows — real screens, not slides.',
  },
  {
    number: '04',
    title: 'Hand over',
    description: 'Source, documentation and keys are yours. We keep it running, or you take it anywhere.',
  },
]

function HowWeWork() {
  return (
    <section className="how-we-work" aria-labelledby="how-we-work-title">
      <div className="how-we-work__inner">
        <p className="how-we-work__eyebrow">HOW WE WORK</p>
        <h2 id="how-we-work-title">
          Fixed price. In writing.
          <br />
          Before we start.
        </h2>
        <div className="how-we-work__underline" aria-hidden="true" />

        <div className="how-we-work__steps">
          {processSteps.map((step) => (
            <article className="how-we-work__step" key={step.number}>
              <span className="how-we-work__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowWeWork
