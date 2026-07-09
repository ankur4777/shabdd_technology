import './partner.css';
import { useEffect, useRef, useState } from 'react';

function Partner() {
  const partnerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const companyLogo = [
    { path: '/company_logo/PrtnerBackground.png' },
    { path: '/company_logo/Untitled-design-8.png' },
    { path: '/company_logo/Untitled-design-9.png' },
  ];
  const logoItems = [...companyLogo, ...companyLogo];

  useEffect(() => {
    const currentPartner = partnerRef.current;

    if (!currentPartner) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(currentPartner);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={partnerRef} className={`partner ${isVisible ? 'partner-visible' : ''}`}>
      <img className="partner-bg" src="/allservicetext/divBackground.png" alt="" />
      <div className="partner-content">

        <div className="partner-logo-wrapper">
          <div className="partner-logo-track">
            {logoItems.map((e, index) => (
              <img key={`logo-${index}`} src={e.path} alt={`Partner logo ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="partner-text">
          <h2>Our Genuine Trusted Partners & Clients</h2>
        </div>
        
      </div>
    </div>
  );
}

export default Partner;
