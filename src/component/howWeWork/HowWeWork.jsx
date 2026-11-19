
import React from "react";
import {
  MessageCircleMore,
  FileText,
  Code2,
  Rocket,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import "./howWeWork.css";

const steps = [
  {
    number: "01",
    title: "Talk",
    Icon: MessageCircleMore,
    description:
      "Tell us the problem in your own words. We ask until we understand the work, not just the feature list.",
  },
  {
    number: "02",
    title: "Quote",
    Icon: FileText,
    description:
      "Scope, timeline and one fixed price, in writing, before any work begins.",
  },
  {
    number: "03",
    title: "Build",
    Icon: Code2,
    description:
      "You see it working as it grows — real screens, not slides.",
  },
  {
    number: "04",
    title: "Hand over",
    Icon: Rocket,
    description:
      "Source, documentation and keys are yours. We keep it running, or you take it anywhere.",
  },
];

export default function HowWeWork() {
  return (
    <section className="hww-section" id="how-we-work">
      <div className="hww-bg-circle hww-bg-circle--left" />
      <div className="hww-bg-circle hww-bg-circle--right" />

      <div className="hww-dots hww-dots--left" />
      <div className="hww-dots hww-dots--right" />

      <div className="hww-container">
        <header className="hww-header">
          <div className="hww-eyebrow">
            <span>HOW WE WORK</span>
            <span className="hww-eyebrow-line" />
          </div>

          <h2>
            Fixed price. In writing.
            <br />
            Before we start.
          </h2>

          <p>
            A clear and simple process that keeps your project on track,
            from the first conversation to final delivery.
          </p>
        </header>

        <div className="hww-workflow">
          <svg
            className="hww-connection"
            viewBox="0 0 1200 70"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 50 35 C 150 5, 250 65, 350 35 S 550 5, 650 35 S 850 65, 950 35 S 1100 5, 1150 35"
              fill="none"
              stroke="#FF454D"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="hww-steps">
            {steps.map(({ number, title, Icon, description }) => (
              <article className="hww-step" key={number}>
                <div className="hww-icon">
                  <Icon size={29} strokeWidth={1.8} />
                </div>

                <div className="hww-number">{number}</div>

                <h3>{title}</h3>
                <span className="hww-step-accent" />

                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="hww-floating hww-floating--left">
          <span className="hww-side-caption">
            Your Ideas.
            <br />
            Our Expertise.
          </span>

          <div className="hww-mini-card hww-plan-card">
            <div className="hww-mini-title">
              <CheckCircle2 size={18} />
              <span>Project Plan</span>
            </div>

            <div className="hww-skeleton hww-skeleton--wide" />
            <div className="hww-skeleton" />
            <div className="hww-skeleton hww-skeleton--short" />
          </div>
        </aside>

        <aside className="hww-floating hww-floating--right">
          <span className="hww-side-caption">
            From Idea
            <br />
            to Impact.
          </span>

          <div className="hww-mini-card hww-growth-card">
            <div className="hww-mini-title">
              <TrendingUp size={21} />
              <span>
                Launch
                <br />& Grow
              </span>
            </div>

            <div className="hww-growth-bars">
              {[30, 48, 65, 85, 100].map((height, index) => (
                <span
                  key={index}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <ArrowUpRight className="hww-side-arrow" size={53} />
        </aside>
      </div>
    </section>
  );
}
