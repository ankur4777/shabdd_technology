import React, { useEffect, useState } from "react";
import "./ProductShowcase.css";

const chatbotScreenshot = "/chatboat/aichatboat.png";
const dashboardScreenshot = "/chatboat/dashboardhdd.webp";

/** Reusable, self-contained showcase for Shabdd Technology's AI + live-chat product. */
const icons = {
  bot: (
    <>
      <rect x="4" y="7" width="16" height="13" rx="4" />
      <path d="M12 7V4m-2 0h4M8.5 12h.01M15.5 12h.01M8 16h8M2 12v4m20-4v4" />
    </>
  ),
  headset: (
    <>
      <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
      <rect x="2" y="12" width="4" height="7" rx="2" />
      <rect x="18" y="12" width="4" height="7" rx="2" />
      <path d="M20 19a5 5 0 0 1-5 3h-3" />
    </>
  ),
  message: (
    <path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.9-4.5A8.5 8.5 0 1 1 20 11.5Z" />
  ),
  check: <path d="m5 12 4 4L19 6" />,
  arrow: (
    <>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4V8Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  zoom: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5M10.5 8v5m-2.5-2.5h5" />
    </>
  ),
  close: <path d="M5 5 19 19M19 5 5 19" />,
  layers: (
    <>
      <path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5m-18 5 9 5 9-5" />
    </>
  ),
};
function Icon({ name, size = 22, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {icons[name]}
    </svg>
  );
}

const steps = [
  {
    icon: "message",
    number: "01",
    title: "Visitor Starts Chat",
    description: "A visitor asks a question on your website.",
  },
  {
    icon: "bot",
    number: "02",
    title: "AI Assists Instantly",
    description: "Your chatbot answers and guides the conversation.",
  },
  {
    icon: "headset",
    number: "03",
    title: "Human Takes Over",
    description: "A support agent can continue the conversation when needed.",
  },
];

/**
 * Props:
 * - onBookDemo?: callback for your booking modal
 * - demoHref?: booking/contact URL, defaults to the phone number
 * - videoUrl?: URL to a real product video; if omitted second button opens screenshots
 */
export default function ProductShowcase({
  onBookDemo,
  demoHref = "tel:+16048340062",
  videoUrl,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!selectedImage) return undefined;
    function onKeyDown(event) {
      if (event.key === "Escape") setSelectedImage(null);
    }
    document.addEventListener("keydown", onKeyDown);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = oldOverflow;
    };
  }, [selectedImage]);

  return (
    <section
      className="sts-showcase"
      id="our-product"
      aria-labelledby="sts-product-heading"
    >
      <div className="sts-glow sts-glow-left" aria-hidden="true" />
      <div className="sts-glow sts-glow-right" aria-hidden="true" />
      <div className="sts-container">
        <header className="sts-heading">
          <span className="sts-eyebrow">
            <Icon name="layers" size={18} /> Our Product
          </span>
          <h2 id="sts-product-heading">
            AI Chatbot + Live Chat <span>Support Platform</span>
          </h2>
          <p>
            Engage your customers instantly with an AI chatbot and connect them
            with your support team whenever they need human assistance.
          </p>
          <div className="sts-heading-rule" aria-hidden="true" />
        </header>

        <div className="sts-product-stage">
          <div
            className="sts-visuals"
            aria-label="Screenshots of Shabdd TripMate and the support agent dashboard"
          >
            <button
              type="button"
              className="sts-chat-preview sts-image-button"
              onClick={() => setSelectedImage("chatbot")}
              aria-label="Enlarge chatbot screenshot"
            >
              <img
                src={chatbotScreenshot}
                alt="Shabdd TripMate chatbot showing greeting, trip options and a connect-to-support button"
                loading="lazy"
                decoding="async"
              />
              <span className="sts-zoom">
                <Icon name="zoom" size={16} /> View
              </span>
            </button>
            <button
              type="button"
              className="sts-laptop sts-image-button"
              onClick={() => setSelectedImage("dashboard")}
              aria-label="Enlarge support agent dashboard screenshot"
            >
              <div className="sts-laptop-screen">
                <img
                  src={dashboardScreenshot}
                  alt="Support agent dashboard with availability, waiting chats, active chats and recent conversations"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="sts-laptop-base" aria-hidden="true" />
              <span className="sts-zoom">
                <Icon name="zoom" size={16} /> View
              </span>
            </button>
          </div>

        </div>

        <div className="sts-how">
          <div className="sts-section-heading">
            <h3>How It Works</h3>
            <p>A simple and seamless support experience for your customers.</p>
          </div>
          <div className="sts-steps">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="sts-step">
                  <span className="sts-step-icon">
                    <Icon name={step.icon} size={29} />
                  </span>
                  <div>
                    <h4>
                      <span>{step.number}.</span> {step.title}
                    </h4>
                    <p>{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <span className="sts-step-arrow" aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="sts-cta">
          <div className="sts-cta-copy">
            <span className="sts-cta-icon">
              <Icon name="target" size={35} />
            </span>
            <div>
              <h3>See Shabdd TripMate in Action!</h3>
              <p>
                Discover how our AI chatbot and live chat can work together to
                simplify customer support.
              </p>
            </div>
          </div>
          <div className="sts-cta-actions">
            {onBookDemo ? (
              <button
                type="button"
                className="sts-button sts-button-primary"
                 href="tel:+917347673924" aria-label="Call Shabdd Technology"
              >
                <Icon name="calendar" size={20} /> Book a Demo
              </button>
            ) : (
              <a className="sts-button sts-button-primary"  href="tel:+917347673924" aria-label="Call Shabdd Technology">
                <Icon name="calendar" size={20} /> Book a Demo
              </a>
            )}
            {videoUrl ? (
              <a
                className="sts-button sts-button-secondary"
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="play" size={20} /> Watch Video
              </a>
            ) : (
              <button
                type="button"
                className="sts-button sts-button-secondary"
                onClick={() => setSelectedImage("chatbot")}
              >
                <Icon name="zoom" size={20} /> View Screenshots
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="sts-lightbox"
          role="presentation"
          onClick={() => setSelectedImage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedImage === "chatbot" ? "Chatbot" : "Agent dashboard"} screenshot`}
            className="sts-lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="sts-lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close screenshot"
            >
              <Icon name="close" size={23} />
            </button>
            <img
              src={
                selectedImage === "chatbot"
                  ? chatbotScreenshot
                  : dashboardScreenshot
              }
              alt={
                selectedImage === "chatbot"
                  ? "Full-size Shabdd TripMate chatbot screenshot"
                  : "Full-size support agent dashboard screenshot"
              }
            />
          </div>
        </div>
      )}
    </section>
  );
}
