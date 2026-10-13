import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaArrowRight,
  FaCamera,
  FaMapMarkerAlt,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Gallery.css';
import destinations from './destinationData';

const img = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const heroCards = [
  { title: 'Adventure', image: img('photo-1500530855697-b586d89ba3ee', 900) },
  { title: 'Culture', image: img('photo-1528164344705-47542687000d', 900) },
  { title: 'Destinations', image: img('photo-1548013146-72479768bada', 1000), featured: true },
  { title: 'Memories', image: img('photo-1570077188670-e3a8d69ac5ff', 900) },
  { title: 'Nature', image: img('photo-1506905925346-21bda4d32df4', 900) },
];

const stories = [
  {
    name: 'Priya S.',
    place: 'Greece',
    quote: 'A trip filled with beauty and unforgettable memories.',
    image: img('photo-1500530855697-b586d89ba3ee', 600),
  },
  {
    name: 'Rahul K.',
    place: 'Switzerland',
    quote: 'Best group tour experience ever. Everything was so well planned.',
    image: img('photo-1542359649-31e03cd4d909', 600),
  },
  {
    name: 'Anjali M.',
    place: 'Manali',
    quote: 'Amazing destinations and a very supportive team.',
    image: img('photo-1483664852095-d6cc6870702d', 600),
  },
  {
    name: 'Vikram D.',
    place: 'Maldives',
    quote: 'Truly a life-changing experience.',
    image: img('photo-1514282401047-d79a71a590e8', 600),
  },
];

const stats = [
  { value: '5,000+', label: 'Travel Moments', icon: <FaCamera /> },
  { value: '1,000+', label: 'Happy Travellers', icon: <FaUsers /> },
  { value: '50+', label: 'Destinations', icon: <FaMapMarkerAlt /> },
  { value: '4.8/5', label: 'Traveller Rating', icon: <FaStar /> },
];

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroCards.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  const goToSlide = (direction) => {
    setActiveIndex((currentIndex) => (currentIndex + direction + heroCards.length) % heroCards.length);
  };

  return (
    <main className="travel-gallery-page">
      <section className="gallery-hero">
        <div className="gallery-hero-overlay" />
        <button
          className="gallery-round-control gallery-round-control-left"
          aria-label="Previous gallery slide"
          onClick={() => goToSlide(-1)}
        >
          <FaArrowLeft />
        </button>
        <button
          className="gallery-round-control gallery-round-control-right"
          aria-label="Next gallery slide"
          onClick={() => goToSlide(1)}
        >
          <FaArrowRight />
        </button>

        <div className="gallery-container gallery-hero-content">
          <p className="gallery-eyebrow"><span /> Our Gallery <span /></p>
          <h1>Frames of a Bigger Journey</h1>
          <p className="gallery-hero-copy">Real people. Real journeys. Real experiences.</p>

          <div className="gallery-hero-cards" aria-label="Featured travel gallery">
            {heroCards.map((card, index) => {
              const offset = (index - activeIndex + heroCards.length) % heroCards.length;
              const isActive = offset === 0;
              const isNext = offset === 1 || offset === 2;
              const isPrev = offset === heroCards.length - 1 || offset === heroCards.length - 2;

              return (
                <article
                  className={`gallery-hero-card ${isActive ? 'gallery-hero-card-featured gallery-hero-card-active' : ''} ${isNext ? 'gallery-hero-card-next' : ''} ${isPrev ? 'gallery-hero-card-prev' : ''}`}
                  key={card.title}
                  style={{ backgroundImage: `url("${card.image}")` }}
                >
                  <span>{card.title}</span>
                </article>
              );
            })}
          </div>

          <div className="gallery-dots" aria-hidden="true">
            {heroCards.map((card, index) => (
              <button
                key={card.title}
                type="button"
                className={index === activeIndex ? 'active' : ''}
                aria-label={`Show ${card.title} slide`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section gallery-destinations">
        <div className="gallery-container">
          <div className="gallery-section-header">
            <div>
              <p className="gallery-kicker">Explore by destination</p>
              <h2>Our Travel Gallery</h2>
              <p>A glimpse into the incredible destinations, cultures and memories created with Shabdd Travels.</p>
            </div>
            <Link className="gallery-outline-button" to="/contact">
              View All Photos <FaArrowRight />
            </Link>
          </div>

          <div className="destination-grid">
            {destinations.map((destination) => (
              <article className="destination-card" key={destination.slug}>
                <img src={destination.image} alt={destination.place} loading="lazy" />
                <span className="destination-card-shade" />
                <span className="destination-card-title">{destination.place}</span>
                <span className="destination-card-arrow"><FaArrowRight /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section gallery-video-section">
        <div className="gallery-container gallery-video-layout">
          <div className="gallery-video-copy">
            <p className="gallery-kicker">Video gallery</p>
            <h2>Experience Our Journeys in Motion</h2>
            <p>Watch beautiful moments, real experiences and unforgettable destinations from our travellers across the world.</p>
            <p className="gallery-video-attribution">
              Travel footage: <a href="https://commons.wikimedia.org/wiki/File:Beach_in_Carrascal.webm" target="_blank" rel="noopener noreferrer">Beach in Carrascal</a> by Wazzup Carl, licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
            </p>
            <Link className="gallery-solid-button" to="/contact">
              Watch Full Gallery <FaArrowRight />
            </Link>
          </div>
          <div className="gallery-video-card">
            <video
              ref={videoRef}
              className="gallery-video-player"
              poster={img('photo-1507525428034-b723cf961d3e', 1400)}
              controls
              playsInline
              preload="metadata"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              aria-label="Travel moments video"
            >
              <source src={`${process.env.PUBLIC_URL}/travel-beach.webm`} type="video/webm" />
              Your browser does not support video playback.
            </video>
            {!isVideoPlaying && (
              <button
                className="gallery-video-play"
                type="button"
                aria-label="Play travel video"
                onClick={() => videoRef.current?.play()}
              >
                <span aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="gallery-video-thumbs" aria-label="More videos">
            <button aria-label="Previous videos"><FiChevronUp /></button>
            <img src={img('photo-1506905925346-21bda4d32df4', 320)} alt="Mountain video thumbnail" loading="lazy" />
            <img src={img('photo-1609948543911-7f01ff385be5', 320)} alt="Golden temple video thumbnail" loading="lazy" />
            <img src={img('photo-1548013146-72479768bada', 320)} alt="Desert video thumbnail" loading="lazy" />
            <button aria-label="Next videos"><FiChevronDown /></button>
          </div>
        </div>
      </section>

      <section className="gallery-stats" aria-label="Gallery statistics">
        <div className="gallery-container gallery-stats-grid">
          {stats.map((stat) => (
            <div className="gallery-stat" key={stat.label}>
              <span className="gallery-stat-icon">{stat.icon}</span>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery-section gallery-stories">
        <div className="gallery-container gallery-stories-layout">
          <div className="gallery-story-heading">
            <p className="gallery-kicker">Traveller stories</p>
            <h2>Captured by Our Travellers</h2>
            <p>Real stories, real memories and real moments from our travel community.</p>
          </div>
          <button className="gallery-small-control" aria-label="Previous story"><FaArrowLeft /></button>
          <div className="story-cards">
            {stories.map((story) => (
              <article className="story-card" key={story.name}>
                <img src={story.image} alt={`${story.name} travel memory`} loading="lazy" />
                <p>"{story.quote}"</p>
                <div>
                  <span className="story-avatar">{story.name.charAt(0)}</span>
                  <span><strong>{story.name}</strong>{story.place}</span>
                </div>
              </article>
            ))}
          </div>
          <button className="gallery-small-control" aria-label="Next story"><FaArrowRight /></button>
        </div>
        <div className="gallery-dots story-dots" aria-hidden="true">
          <span className="active" />
          <span />
          <span />
        </div>
      </section>

      <section className="gallery-cta">
        <div className="gallery-container gallery-cta-inner">
          <div>
            <h2>Your Next Story <span>Could Be Here</span></h2>
            <p>Travel with us and create memories worth sharing.</p>
          </div>
          <Link className="gallery-solid-button" to="/contact">
            Plan Your Journey <FaArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
