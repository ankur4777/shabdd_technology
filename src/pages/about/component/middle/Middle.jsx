import React, { useEffect, useRef } from 'react';
import {
  FaChartBar,
  FaChartLine,
  FaHeadset,
  FaLightbulb,
  FaPlay,
  FaThumbsUp,
  FaBullseye,
  FaCog,
  FaCloud,
} from 'react-icons/fa';
import './Middle.css';

const highlights = [
  {
    icon: <FaLightbulb />,
    title: 'Innovative Solutions',
    text: 'Cutting-edge app development and IT strategies that keep your business ahead of the curve.',
  },
  {
    icon: <FaBullseye />,
    title: 'Tailored Approaches',
    text: 'Customized services that align with your business objectives for maximum impact.',
  },
  {
    icon: <FaCog />,
    title: 'Holistic Services',
    text: 'From marketing to technical support, we cover every aspect of your digital journey.',
  },
  {
    icon: <FaChartLine />,
    title: 'Proven Results',
    text: 'We focus on driving measurable growth, with strategies that deliver high ROI',
  },
];

function Middle() {
  const growthVisualRef = useRef(null);

  useEffect(() => {
    const visual = growthVisualRef.current;

    if (!visual) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      visual.style.setProperty('--middle-growth-scale', '1');
      visual.style.setProperty('--middle-growth-opacity', '1');
      visual.style.setProperty('--middle-growth-y', '0px');
      visual.style.setProperty('--middle-card-opacity', '1');
      visual.style.setProperty('--middle-card-y', '0px');
      visual.classList.add('middle-visual-active');
      return undefined;
    }

    let frameId = null;

    const updateAnimation = () => {
      const rect = visual.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.95;
      const end = viewportHeight * 0.28;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const cardProgress = Math.min(1, Math.max(0, (progress - 0.35) / 0.45));

      visual.style.setProperty('--middle-growth-scale', progress.toFixed(3));
      visual.style.setProperty('--middle-growth-opacity', progress.toFixed(3));
      visual.style.setProperty('--middle-growth-y', `${((1 - progress) * 70).toFixed(1)}px`);
      visual.style.setProperty('--middle-card-opacity', cardProgress.toFixed(3));
      visual.style.setProperty('--middle-card-y', `${((1 - cardProgress) * 34).toFixed(1)}px`);
      visual.classList.toggle('middle-visual-active', progress >= 1);
      frameId = null;
    };

    const requestAnimationUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateAnimation);
    };

    updateAnimation();
    window.addEventListener('scroll', requestAnimationUpdate, { passive: true });
    window.addEventListener('resize', requestAnimationUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', requestAnimationUpdate);
      window.removeEventListener('resize', requestAnimationUpdate);
    };
  }, []);

  return (
    <section className="middle-trusted-section">
      <div className="middle-hero-grid">
        <div className="middle-copy">
          <article className="middle-profile-poster">
            <div className="middle-profile-heading">
              

              <h2>
                Your <span className='h2-italic' >Trusted</span> Partner
                <br />
                in Digital Solutions
              </h2>
            </div>

            <div className="middle-title-line" />

            <div className="middle-profile-photo">
              <img src="/Manager/Sir.jpeg" alt="Pardeep Bhatia" />
            </div>
          
            <div className="middle-profile-details">
              <div className="middle-role-row">
                <span />
                <strong>CEO</strong>
                <span />
              </div>

              <h3>PARDEEP BHATIA</h3>
             

              <div className="middle-profile-divider" />

              <div className="middle-profile-body">
                <p>
                  At Shabdd Technologies, we are dedicated to delivering cutting-edge IT solutions that empower
                  businesses to succeed in the digital age.
                </p>

                <p>
                  From app development and lead generation to social media marketing and SEO management, we provide
                  comprehensive services tailored to your needs. <em>Let us help elevate your business to new heights.</em>
                </p>
              </div>
            </div>
          </article>

          <div className="middle-copy-main">
            <h2>
              Your <span>Trusted</span> Partner
              <br />
              in Digital Solutions
            </h2>
            <div className="middle-title-line" />

            <div className="middle-testimonial">
              <img src="/Manager/Sir.jpeg" alt="Pardeep Bhatia" />
              <div className="middle-testimonial-content">
                <h4>CEO</h4>
                <p>Pardeep Bhatia</p>
                <small>Visionary Leader &amp; Digital Transformation Expert</small>
              </div>
            </div>
          </div>

          <article className="middle-about-card">
            <header>
              <div className="middle-about-card-icon">
                <FaCog />
              </div>
              <div>
                <h3>About Shabdd Technologies</h3>
               
              </div>
            </header>

            <p className="middle-copy-detail">
              At Shabdd Technologies, we are dedicated to delivering IT solutions that help businesses thrive in an ever-evolving digital landscape. With a focus on app development, lead generation, social media marketing, and SEO management, we provide comprehensive services that cater to your unique business needs.
            </p>

           
            <p className="middle-copy-detail">
              With expertise and a client-centric approach, Shabdd Technologies transforms ideas into powerful digital
              solutions. Whether you need a custom app, effective lead generation strategies, or a robust online presence,
              we are here to make it happen.
            </p>
          </article>
        </div>
      <div className="middle-left-visual" ref={growthVisualRef}>
          <img
            className="middle-growth-image"
            src="/about_images/image-4.png"
            alt="Growth and engagement illustration"
          />

          <div className="middle-engagement">
            <div className="middle-engagement-icon">
              <FaChartBar />
            </div>
            <div>
              <strong>120%</strong>
              <span>ENGAGEMENT</span>
            </div>
          </div>

          <div className="middle-sales-card">
            <div className="middle-sales-top">
              <strong>
                Increase
                <br />
                Sales
              </strong>
              <span>+66.4%</span>
            </div>
            <svg className="middle-chart" viewBox="0 0 240 118" role="img" aria-label="Sales growth chart">
              <defs>
                <linearGradient id="middleChartFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#14bd8b" stopOpacity=".22" />
                  <stop offset="100%" stopColor="#14bd8b" stopOpacity=".05" />
                </linearGradient>
              </defs>
              <g stroke="#e8edf1" strokeWidth="1">
                <path d="M8 20 V112" />
                <path d="M56 20 V112" />
                <path d="M104 20 V112" />
                <path d="M152 20 V112" />
                <path d="M200 20 V112" />
              </g>
              <path className="middle-chart-fill" d="M8 96 C22 72 34 100 48 64 C64 27 82 68 96 86 C112 108 128 49 144 80 C160 114 174 120 190 70 C204 38 215 78 232 18 L232 112 L8 112 Z" fill="url(#middleChartFill)" />
              <path className="middle-chart-line" d="M8 96 C22 72 34 100 48 64 C64 27 82 68 96 86 C112 108 128 49 144 80 C160 114 174 120 190 70 C204 38 215 78 232 18" fill="none" stroke="#10b987" strokeLinecap="round" strokeWidth="5" />
              <circle cx="232" cy="18" r="5" fill="#10b987" />
            </svg>
          </div>
        </div>

        <div className="middle-right-visual">
          <div className="middle-social-card" aria-label="Digital marketing workspace illustration">
            <div className="middle-table-line" />
            <div className="middle-laptop one" />
            <div className="middle-laptop two" />
            <div className="middle-laptop three" />
            <div className="middle-laptop four" />
            <div className="middle-hand one" />
            <div className="middle-hand two" />
            <div className="middle-hand three" />
            <div className="middle-hand four" />
            <span className="middle-round left"><FaThumbsUp /></span>
            <span className="middle-bubble like">Like</span>
            <span className="middle-bubble click">Click</span>
            <span className="middle-play"><FaPlay /></span>
            <span className="middle-bubble hello">Hello</span>
            <span className="middle-round right"><FaCloud /></span>
            <span className="middle-bubble more">Share</span>
          </div>

          <div className="middle-highlights">
            <h4>
              <span>Key Highlights</span> of Shabdd Technologies:
            </h4>

            <div className="middle-card-grid">
              {highlights.map((item) => (
                <article className="middle-highlight-card" key={item.title}>
                  <div className="middle-highlight-icon">{item.icon}</div>
                  <div className='middle-heighlight-text'>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}

              <article className="middle-support-card">
                <div className="middle-support-icon">
                  <FaHeadset />
                </div>
                <div>
                  <h4>Dedicated Support</h4>
                  <p>A skilled team with you at every step.</p>
                </div>
                <div className="middle-agent" aria-hidden="true">
                  <div className="middle-agent-body" />
                  <div className="middle-agent-face" />
                  <div className="middle-agent-hair" />
                  <div className="middle-agent-headset" />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
}

export default Middle;
