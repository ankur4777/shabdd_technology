import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import destinations from './destinationData';
import './DestinationGallery.css';

function DestinationGallery() {
  const { slug } = useParams();
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <main className="destination-detail-page">
      <section
        className="destination-detail-hero"
        style={{ backgroundImage: `url("${destination.image}")` }}
      >
        <div className="destination-detail-shade" />
        <div className="destination-detail-content">
          <Link className="destination-back-link" to="/gallery">
            <FaArrowLeft /> Back to gallery
          </Link>
          <p><FaMapMarkerAlt /> Destination spotlight</p>
          <h1>{destination.place}</h1>
          <span>{destination.description}</span>
        </div>
      </section>

      <section className="destination-detail-info">
        <p className="gallery-kicker">Explore the destination</p>
        <h2>Make memories in {destination.place}</h2>
        <p>{destination.description} Let our team help you plan a journey that you will remember for years to come.</p>
        <div className="destination-detail-actions">
          <Link className="destination-contact-button" to="/contact">
            Contact Us <FaArrowRight />
          </Link>
          <Link className="destination-gallery-button" to="/gallery">
            Explore Other Destinations
          </Link>
        </div>
      </section>
    </main>
  );
}

export default DestinationGallery;
