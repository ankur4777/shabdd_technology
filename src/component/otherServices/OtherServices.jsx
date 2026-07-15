import './otherservices.css';
import { Link } from 'react-router-dom';

function OtherServices()
{

  const otherServices = [
    {image:"/background/Youtub Ads (2).png", Title:"YouTube Ads", path:"/services/youtube-ads", accent:"239, 31, 42"},
    {image:"/background/Meta Ads.png", Title:"Meta Ads", path:"/services/meta-ads", accent:"238, 42, 123"},
    {image:"/background/Marketing Icon.png", Title:"Social Media Marketing", path:"/services/digital-marketing", accent:"75, 183, 54"},
    {image:"/background/Graphic designer.png", Title:"Graphic Designing", path:"/services/graphic-designing", accent:"139, 68, 226"},
    {image:"/web development  icon.png", Title:"Web Development", path:"/services/web-development", accent:"242, 58, 47"},
    {image:"/Web Application.png", Title:"Web Application", path:"/services/web-application", accent:"47, 149, 214"}
  ];

  const services = [...otherServices, ...otherServices];

  return (
    <div className="otherservices">
      <div className="otherservices-heading">
        <h2>Other <span className='h2-italic'>Services</span></h2>
        <p>Build a powerful digital presence with tailored solutions that captivate visitors and convert them into loyal customers.</p>
      </div>
      <div className="otherservice-container">
        <div className="otherservice-track">
          {services.map((e,index)=>(
            <Link to={e.path} className="service-card" key={`${e.Title}-${index}`} style={{ '--other-service-accent': e.accent }}>
              <div className="service-icon-wrap">
                <img src={e.image} alt={e.Title} />
              </div>
              <h3>{e.Title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OtherServices;
