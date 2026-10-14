import { Link } from 'react-router-dom';
import {
  FaBalanceScale,
  FaCheckCircle,
  FaDollarSign,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaFileAlt,
  FaLightbulb,
  FaShieldAlt,
  FaSyncAlt,
  FaUserCheck,
} from 'react-icons/fa';
import './TermsOfService.css';

const sections = [
  {
    title: 'Acceptance of Terms',
    icon: FaFileAlt,
    image: '/terms/acceptance.webp',
    summary:
      'By accessing or using the Shabdd Innovations website and services, you agree to comply with these Terms of Service. If you do not agree, please do not use our website or services.',
  },
  {
    title: 'Services',
    icon: FaLightbulb,
    image: '/terms/services.webp',
    summary:
      'Shabdd Innovations provides digital, consulting, and business support services, including technology and related solutions. Service scope, delivery timelines, and pricing are defined in project-specific proposals or agreements.',
  },
  {
    title: 'User Responsibilities',
    icon: FaUserCheck,
    image: '/terms/responsibilities.webp',
    summary: 'When using our website and services, you agree that:',
    points: [
      'You will provide accurate and complete information when contacting us.',
      'You will not misuse the website or engage in unlawful activity.',
      'You are responsible for maintaining the confidentiality of any account or access credentials you use.',
    ],
  },
  {
    title: 'Intellectual Property',
    icon: FaLightbulb,
    image: '/terms/property.webp',
    summary:
      'Website content, branding, designs, and materials are owned by or licensed to Shabdd Innovations unless otherwise stated. Unauthorized reproduction, distribution, or reuse is prohibited.',
  },
  {
    title: 'Payments and Commercial Terms',
    icon: FaDollarSign,
    image: '/terms/payments.webp',
    summary:
      'Payment schedules, milestones, refunds, and cancellation conditions are governed by signed agreements or approved quotations. Delays in payment may affect project timelines and delivery.',
  },
  {
    title: 'Limitation of Liability',
    icon: FaShieldAlt,
    image: '/terms/libility.webp',
    summary:
      'To the maximum extent permitted by law, Shabdd Innovations is not liable for indirect, incidental, special, or consequential damages arising from use of our website or services.',
  },
  {
    title: 'Warranties Disclaimer',
    icon: FaExclamationTriangle,
    image: '/terms/warranty.webp',
    summary:
      'Website content and services are provided on an “as available” and “as is” basis. We do not guarantee uninterrupted access, error-free operation, or specific outcomes unless expressly agreed in writing.',
  },
  {
    title: 'Third-Party Links and Services',
    icon: FaExternalLinkAlt,
    image: '/terms/thirdparty.webp',
    summary:
      'Our website may include links to third-party resources. We are not responsible for the availability, content, or policies of external websites and platforms.',
  },
  {
    title: 'Governing Law',
    icon: FaBalanceScale,
    image: '/terms/governing-law.webp',
    summary:
      'These Terms are governed by applicable laws of India, unless otherwise required by a signed contract with different jurisdiction terms.',
  },
  {
    title: 'Changes to Terms',
    icon: FaSyncAlt,
    image: '/terms/change.webp',
    summary:
      'We may update these Terms from time to time. Revised terms will be posted on this page with an updated effective date.',
  },
];

function TermsOfService() {
  return (
    <main className="terms-page">
      <section className="terms-hero">
        <img
          className="terms-hero-image"
          src={`${process.env.PUBLIC_URL}/terms/terms_hero.webp`}
          alt=""
          aria-hidden="true"
        />
        <div className="terms-hero-shade" />
        <div className="terms-hero-content">
          <nav className="terms-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">Terms of Service</span>
          </nav>
          <span className="terms-eyebrow">Terms of Service</span>
          <h1>
            Terms of
            <br />
            <span>Service</span>
          </h1>
          <p>
            Please read these Terms of Service carefully before using our
            website or services.
          </p>
        </div>
      </section>

      <section className="terms-content" aria-label="Terms of service details">
        <ol className="terms-sections">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <li
                className={`terms-row ${index % 2 === 1 ? 'terms-row-reverse' : ''}`}
                key={section.title}
              >
                <article className="terms-card">
                  <div className="terms-card-heading">
                    <span className="terms-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2>{section.title}</h2>
                    <span className="terms-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  </div>
                  <p>{section.summary}</p>
                  {section.points && (
                    <ul className="terms-points">
                      {section.points.map((point) => (
                        <li key={point}>
                          <FaCheckCircle aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
                <div className="terms-visual" aria-hidden="true">
                  <img
                    src={`${process.env.PUBLIC_URL}${section.image}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </li>
            );
          })}
        </ol>

        <aside className="terms-contact">
          <div>
            <span className="terms-eyebrow">Still have questions?</span>
            <h2>We’re Here to Help.</h2>
            <p>
              If you have any questions about these Terms of Service, feel free
              to reach out to us.
            </p>
          </div>
          <Link className="terms-contact-link" to="/contact">
            Contact Us <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default TermsOfService;
