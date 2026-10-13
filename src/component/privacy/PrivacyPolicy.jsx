import { Link } from 'react-router-dom';
import {
  FaCookieBite,
  FaDatabase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaLock,
  FaPhoneAlt,
  FaShareAlt,
  FaShieldAlt,
  FaSyncAlt,
  FaUserCheck,
  FaUserFriends,
} from 'react-icons/fa';
import './PrivacyPolicy.css';

const sections = [
  {
    title: 'Introduction',
    icon: FaFileAlt,
    image: '/privacy/security.jpg',
    summary:
      'Shabdd Innovations (“we”, “our” or “us”) respects your privacy. This policy explains how we handle personal information when you visit our website, contact us or use our services.',
    detail: 'We aim to be clear about what we collect and why.',
  },
  {
    title: 'Information We Collect',
    icon: FaUserCheck,
    image: '/privacy/information.jpg',
    summary:
      'Personal information you submit, such as your name, phone number, email address, and business details. Project-related information you provide through forms, consultations, or email communication.',
    detail:
      'Basic technical data such as browser type, device information, IP address, and usage behavior for analytics and performance improvements.',
  },
  {
    title: 'How We Use Your Information',
    icon: FaShieldAlt,
    image: '/privacy/yourinfo1.jpg',
    summary: 'We use information to:',
    points: [
      'To respond to inquiries and provide requested services.',
      'To communicate project updates, proposals, and support information.',
      'To improve website functionality, security, and user experience.',
      'To meet legal, regulatory, and contractual obligations.',
    ],
  },
  {
    title: 'Data Sharing and Disclosure',
    icon: FaShareAlt,
    image: '/privacy/team-a.jpg',
    summary:
      'We do not sell your personal data. We may share information only with trusted service providers, technical partners, or legal authorities when required for service delivery, legal compliance, or protection of right.',
  },
  {
    title: 'Data Retention',
    icon: FaDatabase,
    image: '/privacy/retention1.jpg',
    summary:
      'We retain personal data only as long as needed for legitimate business purposes, legal compliance, and dispute resolution.',
    detail: 'When data is no longer required, we securely delete or anonymize it.',
  },
  {
    title: 'Data Security',
    icon: FaLock,
    image: '/privacy/security1.avif',
    summary:
      'We implement appropriate technical and organizational safeguards to protect your information from unauthorized access, disclosure, or misuse. ',
    detail: 'However, no online platform can be guaranteed as 100% secure.',
  },
  {
    title: 'Your Rights',
    icon: FaUserFriends,
    image: '/blog/3.jpg',
    summary:
      'Depending on applicable law, you may have rights to access, correct, update, or request deletion of your personal data.',
    detail: 'You may also request details about how your information is used.',
  },
  {
    title: 'Cookies and Tracking',
    icon: FaCookieBite,
    image: '/privacy/cookies.jpg',
    summary:
      'Our website may use cookies or similar technologies to improve navigation, measure engagement, and optimize performance.',
    detail:
      'You may disable cookies through your browser settings.',
  },
  {
    title: 'Third-Party Links',
    icon: FaExternalLinkAlt,
    image: '/privacy/third.jpg',
    summary:
      'Our website may include links to third-party websites. ',
    detail: 'We are not responsible for the privacy practices or content of external sites, and we encourage you to read their privacy policies.',
  },
  {
    title: 'Updates to This Policy',
    icon: FaSyncAlt,
    image: '/privacy/update1.jpg',
    summary:
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.',
    detail: 'Please check back periodically for the latest information.',
  },
  {
    title: 'Contact Us',
    icon: FaEnvelope,
    image: '/privacy/contactus.jpg',
    summary:
      'For questions or requests about this Privacy Policy or your personal information, contact Shabdd Innovations.',
    detail: 'We’ll do our best to respond as soon as reasonably possible.',
    contact: true,
  },
];

function PrivacyPolicy() {
  return (
    <main className="privacy-page">
      <section className="privacy-hero">
        <img
          className="privacy-hero-image"
          src={`${process.env.PUBLIC_URL}/privacy/privacy-hero.jpg`}
          alt=""
          aria-hidden="true"
        />
        <div className="privacy-hero-shade" />
        <div className="privacy-hero-content">
          <nav className="privacy-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Privacy Policy</span>
          </nav>
          <span className="privacy-eyebrow">Privacy Policy</span>
          <h1>
            Your Privacy,
            <br />
            <span>Our Priority.</span>
          </h1>
          <p>
            We value your trust and are committed to handling your personal
            information with care.
          </p>
        </div>
        <div className="privacy-hero-mark" aria-hidden="true">
          <FaShieldAlt />
          <span>Trust<br />by design</span>
        </div>
      </section>

      <section className="privacy-content" aria-label="Privacy policy details">
        <div className="privacy-intro">
          <span className="privacy-eyebrow">Your information, respected</span>
          <h2>A clear guide to how we protect your privacy.</h2>
          <p>
            This policy describes the information we may collect, how we use it,
            and the choices available to you when you interact with Shabdd
            Innovations.
          </p>
        </div>

        <ol className="privacy-sections">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <li
                className={`privacy-row ${index % 2 === 1 ? 'privacy-row-reverse' : ''}`}
                key={section.title}
              >
                <article className="privacy-card">
                  <div className="privacy-card-heading">
                    <span className="privacy-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="privacy-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <h3>{section.title}</h3>
                  </div>
                  <p>{section.summary}</p>
                  {section.points && (
                    <ul className="privacy-points">
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                  {section.detail && <p>{section.detail}</p>}
                  {section.contact && (
                    <div className="privacy-contact-links">
                      <a href="mailto:shabddtechnology@gmail.com">
                        <FaEnvelope aria-hidden="true" />
                        shabddtechnology@gmail.com
                      </a>
                      <a href="tel:+919543305791">
                        <FaPhoneAlt aria-hidden="true" />
                        +91-9543305791
                      </a>
                    </div>
                  )}
                </article>
                <aside className={`privacy-visual privacy-visual-${index + 1}`} aria-hidden="true">
                  <img
                    className="privacy-photo"
                    src={`${process.env.PUBLIC_URL}${section.image}`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </aside>
              </li>
            );
          })}
        </ol>
      </section>

    </main>
  );
}

export default PrivacyPolicy;
