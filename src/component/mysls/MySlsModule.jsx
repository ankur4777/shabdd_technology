import './mysls-module.css';

function MySlsModule() {
  return (
    <section className="mysls-module" aria-labelledby="mysls-module-title">
      <div className="mysls-module__content">
        <p className="mysls-module__eyebrow">PLATFORM · MySLS</p>
        <h2 id="mysls-module-title">Multiple modules. One login<span>.</span></h2>
        <p className="mysls-module__lead">
          Admissions, records, fees, a full Learning Hub and auto-grading —
          <br className="mysls-module__desktop-break" /> with an AI assistant on top and compliance checks built in.
        </p>

        <img
          className="mysls-module__dashboard"
          src="/mysls/moduledashboard.png"
          alt="MySLS modules dashboard showing education platform features"
        />

        <div className="mysls-module__links">
          <a href="#mysls-platform">Explore MySLS <span aria-hidden="true">›</span></a>
          <a href="https://lms.shabddtravels.in/" target="_blank" rel="noreferrer">
            Visit lms.shabddtravels.in <span aria-hidden="true">›</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default MySlsModule;
