import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './NavCenter.css';
import { BiSolidDownArrow } from "react-icons/bi";


const services = [
  { label: 'WEB DEVELOPMENT', path: '/services/web-development' },
  { label: 'WEB APPLICATION', path: '/services/web-application' },
  { label: 'DIGITAL MARKETING', path: '/services/digital-marketing' },
  { label: 'SEO', path: '/services/seo' },
  { label: 'META ADS', path: '/services/meta-ads' },
  { label: 'GRAPHIC DESIGNING', path: '/services/graphic-designing' },
  { label: 'YOUTUBE ADS', path: '/services/youtube-ads' },
];

function NavCenter({ isOpen = false, onNavigate }) {
  const [serviceOpen, setServiceOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setServiceOpen(false);
    }
  }, [isOpen]);

  const handleNavigate = () => {
    setServiceOpen(false);
    onNavigate?.();
  };

  const closeServicesOnDesktop = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setServiceOpen(false);
    }
  };

  return (
    <div className={`nav-center ${isOpen ? 'nav-center-open' : ''}`}>
      <Link className="nav-link" to="/" onClick={handleNavigate}><b>HOME</b></Link>
      <Link className="nav-link" to="/about" onClick={handleNavigate}><b>ABOUT US</b></Link>

      <div className={`nav-dropdown ${serviceOpen ? 'nav-dropdown-open' : ''}`} onMouseLeave={closeServicesOnDesktop}>
        <button
          className="nav-link nav-dropdown-button"
          type="button"
          aria-expanded={serviceOpen}
          onClick={() => setServiceOpen((open) => !open)}
        >
          SERVICES 
          <BiSolidDownArrow className="nav-dropdown-icon" />
        </button>
        

        <div className="dropdown-menu">
          {services.map((service) => (
            <Link className="dropdown-link" to={service.path} key={service.path} onClick={handleNavigate}>
              {service.label}
            </Link>
          ))}
        </div>
      </div>

      <Link className="nav-link" to="/contact" onClick={handleNavigate}><b>CONTACT US</b></Link>
    </div>
  );
}

export default NavCenter;
