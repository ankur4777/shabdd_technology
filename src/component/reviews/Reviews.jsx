import './reviews.css';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

function Reviews() {
  const reviews = [
    {
      text: 'Shabdd Technology exceeded our expectations with their top-notch web development services. The team was professional and responsive. Highly recommended.',
      name: 'Raman Makkar',
      role: 'Client',
      initials: 'RM',
      tone: 'red',
    },
    {
      text: 'Exceptional mobile app development experience. The app is sleek and delivered on time. Fantastic work by the team.',
      name: 'Deepak Rawat',
      role: 'Client',
      initials: 'DR',
      tone: 'blue',
    },

    {
  text: 'Even after delivery, the support team stayed responsive and helpful. It’s rare to find such dedication and attention to detail in tech services.',
  name: 'Arjun',
  role: 'Client',
  initials: 'DR',
  tone: 'red',
},
{
  text: 'From concept to launch, everything was handled with precision and care. The project was completed on time and exceeded our expectations in quality.',
  name: 'Ankur',
  role: 'Client',
  initials: 'DR',
  tone: 'blue',
}


  ];

  return (
    <section className="reviews">
      <div className="reviews-panel">
        <div className="reviews-dots reviews-dots-left" aria-hidden="true" />
        <div className="reviews-dots reviews-dots-right" aria-hidden="true" />

        <div className="reviews-heading">
          <p className="reviews-kicker">Testimonials</p>
          <h2 className='h2-left-small'>
            Our <span className='h2-italic'>Client&apos;s</span> Reviews
          </h2>
          <div className="reviews-title-rule" aria-hidden="true" />
          <p>
            Discover why businesses trust SHABDD Technology to elevate their
            digital presence and deliver outstanding results.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className={`review-card review-card-${review.tone}`} key={review.name}>
              <div className="review-card-top">
                <div className="quote-icon" aria-hidden="true">
                  <FaQuoteLeft />
                </div>
                <div className="review-stars" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} />
                  ))}
                </div>
              </div>
              <p className="review-text">&quot;{review.text}&quot;</p>
              <div className="quote-watermark" aria-hidden="true">
                &rdquo;
              </div>

              <div className="review-author">
                <div className="review-avatar">{review.initials}</div>
                <div>
                  <h3>{review.name}</h3>
                  <div id="review-client">{review.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
