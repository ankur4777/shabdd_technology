import React, { useEffect, useState } from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaExternalLinkAlt,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './Gallery.css';

const galleryImage = (name) => `${process.env.PUBLIC_URL}/Gallery/${name}`;

const heroCards = [
  { title: 'Our Team', image: galleryImage('(3).webp') },
  { title: 'Collaboration', image: galleryImage('4.webp') },
  { title: 'Our Workspace', image: galleryImage('10.webp'), featured: true },
  { title: 'Creative Space', image: galleryImage('11.webp') },
  { title: 'Innovation', image: galleryImage('5.webp') },
];

const stories = [
  {
    name: 'Shabdd Team',
    place: 'People behind the work',
    quote: 'Real people, real collaboration and real growth from the team that builds every idea with care.',
    image: galleryImage('Shabdd-team.webp'),
  },
];

const stats = [
  { value: '50+', label: 'Team Members', icon: <FaUsers /> },
  { value: '200+', label: 'Projects Delivered', icon: <FaBriefcase /> },
  { value: '5+', label: 'Years of Experience', icon: <FaStar /> },
  { value: '100+', label: 'Happy Clients', icon: <FaBuilding /> },
];

const workspaceImages = ['10.webp', '11.webp', '4.webp', '5.webp'];

const projects = [
  {
    title: 'Shabdd Travels',
    description: 'A travel platform built for tour discovery, package browsing and smooth enquiry journeys.',
    image: galleryImage('project-shabdd-travels.png'),
    url: 'https://shabddtravels.in/',
    tags: ['Travel Website', 'Bookings'],
  },
  {
    title: 'Shabdd Innovations',
    description: 'A digital agency website that presents services, portfolio work and business growth solutions.',
    image: galleryImage('project-shabdd-innovations.png'),
    url: 'https://shabddinnovations.in/',
    tags: ['Business Website', 'Services'],
  },
  {
    title: 'Shabdd LMS',
    description: 'A learning management platform for courses, student progress, lessons and admin insights.',
    image: galleryImage('project-shabdd-lms.png'),
    url: 'https://lms.shabddtravels.in/',
    tags: ['LMS', 'Education'],
  },
];

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [activeWorkspaceIndex, setActiveWorkspaceIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroCards.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  const goToSlide = (direction) => {
    setActiveIndex((currentIndex) => (currentIndex + direction + heroCards.length) % heroCards.length);
  };

  const goToWorkspaceImage = (direction) => {
    setActiveWorkspaceIndex(
      (currentIndex) => (currentIndex + direction + workspaceImages.length) % workspaceImages.length
    );
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
          <h1>Inside <span>Shabdd Innovations</span></h1>
          <p className="gallery-hero-copy">People. Ideas. Innovation.</p>

          <div className="gallery-hero-cards" aria-label="Featured Shabdd Innovations gallery">
            {heroCards.map((card, index) => {
              const offset = (index - activeIndex + heroCards.length) % heroCards.length;
              const isActive = offset === 0;
              const cardPosition =
                offset === 0
                  ? 'active'
                  : offset <= heroCards.length / 2
                    ? `next-${offset}`
                    : `prev-${heroCards.length - offset}`;

              return (
                <article
                  className={`gallery-hero-card gallery-hero-card-${cardPosition} ${isActive ? 'gallery-hero-card-featured gallery-hero-card-active' : ''}`}
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

      <section className="gallery-section gallery-workspace">
        <div className="gallery-container gallery-workspace-layout">
          <div className="gallery-workspace-copy">
            <p className="gallery-kicker">Our Workspace</p>
            <h2>A Glimpse Into <span>Our World</span></h2>
            <p>Explore our office, teams, projects and the moments that make Shabdd Innovations special. Real people, real work and real growth.</p>
          </div>
          <div className="gallery-workspace-main">
            <img
              src={galleryImage(workspaceImages[activeWorkspaceIndex])}
              alt="Shabdd Innovations workspace"
              loading="lazy"
            />
          </div>
          <div className="gallery-video-thumbs" aria-label="Workspace photos">
            <button type="button" aria-label="Previous workspace photos" onClick={() => goToWorkspaceImage(-1)}>
              <FiChevronUp />
            </button>
            {workspaceImages.map((image, index) => (
              <button
                type="button"
                className={`gallery-thumb-button ${index === activeWorkspaceIndex ? 'active' : ''}`}
                aria-label={`Show workspace photo ${index + 1}`}
                onClick={() => setActiveWorkspaceIndex(index)}
                key={image}
              >
                <img src={galleryImage(image)} alt="Shabdd workspace thumbnail" loading="lazy" />
              </button>
            ))}
            <button type="button" aria-label="Next workspace photos" onClick={() => goToWorkspaceImage(1)}>
              <FiChevronDown />
            </button>
          </div>
        </div>
      </section>

      <section className="gallery-section gallery-stories">
        <div className="gallery-container gallery-stories-layout">
          <div className="gallery-story-heading">
            <p className="gallery-kicker">Our People</p>
            <h2>Stories from <span>Our Team</span></h2>
            <p>Real experiences, real growth and real moments from the people who make Shabdd Innovations.</p>
          </div>
          <button className="gallery-small-control" aria-label="Previous story"><FaArrowLeft /></button>
          <div className="story-cards">
            {stories.map((story) => (
              <article className="story-card" key={story.name}>
                <img src={story.image} alt={`${story.name} at Shabdd Innovations`} loading="lazy" />
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
      </section>

      <section className="gallery-section gallery-projects">
        <div className="gallery-container gallery-projects-layout">
          <div className="gallery-story-heading">
            <p className="gallery-kicker">Our Projects</p>
            <h2>Ideas Turned Into <span>Impact</span></h2>
            <p>A look at some of the projects we have worked on, the solutions we have built and the clients we have helped grow.</p>
          </div>
          <div className="project-cards">
            {projects.map((project) => (
              <a
                className="story-card project-card"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                key={project.title}
              >
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <strong className="project-card-link">Visit Project <FaExternalLinkAlt /></strong>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export default Gallery;
