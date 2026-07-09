import { useState, useEffect, useMemo } from 'react';
import {Link} from "react-router-dom"
import './Poster.css';

function Poster() {
  const words = useMemo(() => ['presence', 'Business '], []);

  const [index, setIndex]=useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    const currentWord = words[index];
    const typeSpeed = isDeleting ? 45 : 90;
    const holdDelay = 1200;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        return;
      }

      setDisplayText((currentText) =>
        isDeleting
          ? currentWord.substring(0, currentText.length - 1)
          : currentWord.substring(0, currentText.length + 1)
      );
    }, !isDeleting && displayText === currentWord ? holdDelay : typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, index, isDeleting, words]);

  return (
    <section className="poster">
      <video className="poster-video" autoPlay muted loop playsInline>
        <source src="/nav.mp4" type="video/mp4" />
      </video>
      <div className="poster-video-overlay" />
      <div className="poster-copy">
        <div className='poster-kicker-background'>
          <span className="poster-kicker"> SHABDD TECHNOLOGY</span>
        </div>
        
        <h1>
          Boost Your
          <br />
          
          <span style={{"color":"red"}}>Online</span> <span className="poster-typewriter">{displayText}</span>
        </h1>
        <p>At Shabdd Technology, we offer cutting-edge digital marketing solutions designed to help your business thrive in the digital landscape. Our team of experts harnesses the power of data-driven strategies, creative content, and advanced technologies to increase your online visibility, attract potential customers, and boost conversions</p>

        <div className="poster-actions">
          <Link to="contact"><a className="poster-primary" href="/services/web-development">
            Free consultant 
          </a></Link>
          {/* <a className="poster-secondary" href="/about">
            Learn More
            <HiArrowRight aria-hidden="true" />
          </a> */}
        </div>
      </div>

      <div className="poster-visual" aria-label="Smiling business professional">
        <div className="poster-shape poster-shape-one" />
        <div className="poster-shape poster-shape-two" />
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=760&q=85"
          alt="Smiling business professional"
        />
      </div>
    </section>
  );
}

export default Poster;
