import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import './NotFound.css';

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-content" aria-labelledby="not-found-title">
        <p className="not-found-kicker">404 error</p>
        <h1 id="not-found-title">This page does not exist</h1>
        <p className="not-found-message for-p-tag">
          The page you are looking for may have been moved, deleted, or the link is incorrect.
        </p>

        <div className="not-found-actions">
          <Link className="not-found-primary" to="/">
            <FaHome aria-hidden="true" />
            Go to home
          </Link>
          <button className="not-found-secondary" type="button" onClick={() => window.history.back()}>
            <FaArrowLeft aria-hidden="true" />
            Go back
          </button>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
