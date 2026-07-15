import { Link } from "react-router-dom"
import './Poster.css';

function Poster() {
  return (
    <section className="poster">
      <video className="poster-bg-video" autoPlay muted loop playsInline>
        <source src={`${process.env.PUBLIC_URL}/hero-bg-video.mp4`} type="video/mp4" />
      </video>
      <div className="poster-video-overlay" aria-hidden="true" />

      <div className="poster-copy">
        <span className="poster-kicker">SHABDD TECHNOLOGY</span>

        <h1>
          Boost Your
          <span className="main-text-span">Online Business</span>
        </h1>

        <p className="poster-description for-p-tag">
          At Shabdd Technology, we offer cutting-edge digital marketing solutions designed
          to help your business thrive in the digital landscape. Our team of experts
          harnesses the power of data-driven strategies, creative content, and advanced
          technologies to increase your online visibility, attract potential customers,
          and boost conversions.
        </p>

        <Link className="poster-consultant-button" to="/contact">
          Free Consultant
        </Link>
      </div>
    </section>
  );
}

export default Poster;
