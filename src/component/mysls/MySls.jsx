import './mysls.css';

function MySls() {
  return (
    <section className="mysls" aria-labelledby="mysls-title" id="mysls-platform">
      <div className="mysls__intro">
        <p className="mysls__eyebrow">FLAGSHIP PLATFORM</p>

        <div className="mysls__brand">
          <img
            id="mysls-title"
            className="mysls__brand-logo"
            src="/mysls/myslslogo.png"
            alt="MY SLS — Shabdd Learning Solution"
          />
        </div>

        <p className="mysls__description">
          The all-in-one education platform and LMS for
          <br className="mysls__desktop-break" /> Canadian colleges. Engineered and scaled by us, delivered across Canada by EduWeb Consulting.
          {/* <br className="mysls__desktop-break" /> delivered across Canada by EduWeb Consulting. */}
        </p>

        <div className="mysls__links">
          <a href="https://mysls.ca/" target="_blank" rel="noreferrer">
            Visit mysls.ca  <span aria-hidden="true">›</span>
          </a>
        </div>

        <div className="mysls__badges" aria-label="MySLS platform highlights">
          <span>Proudly Canadian</span>
          <span>100+ modules · one login</span>
          <span>Compliance, automated</span>
          <span>Education management + LMS</span>
        </div>
      </div>

      <div className="mysls__showcase">
        <div className="mysls__device mysls__device--profile">
          <img
            src="/mysls/image.webp"
            alt="ClassTrack college admin profile displayed on a laptop"
          />
        </div>
        <div className="mysls__device mysls__device--dashboard">
          <img
            src="/mysls/admindashboard.jpeg"
            alt="ClassTrack college admin dashboard"
          />
        </div>
      </div>
    </section>
  );
}

export default MySls;
