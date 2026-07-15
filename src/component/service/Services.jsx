import React from 'react'
import { Link } from "react-router-dom"
import "./service.css"
import { RxFontStyle } from 'react-icons/rx'

function Services() {

  const services = [
    { lable: "Web Development/Web Application", path: '/services/web-application', image: "/background/Web Application.png", accent: "47, 149, 214", description: "Responsive websites and scalable web applications that combine modern design, performance, and functionality for business growth., ensuring seamless performance across all devices" },
    { lable: "Digital Marketing", path: '/services/digital-marketing', image: "/background/Marketing Icon.png", accent: "75, 183, 54", description: "Amplify your brand’s voice and engage with your audience on social media platforms. We create data-driven campaigns that foster interaction and promote brand loyalty." },
    { lable: "Search Engine optimization", path: '/services/seo', image: "/background/SEO.png", accent: "242, 151, 26", description: "Enhance your website’s visibility on search engines with our comprehensive SEO strategies. We optimize your online presence to drive organic traffic and boost your rankings." },
    { lable: "Meta ADS", path: '/services/meta-ads', image: "/background/Meta Ads.png", accent: "238, 42, 123", description: "Amplify your brand’s voice and engage with your audience on social media platforms. We create data-driven campaigns that foster interaction and promote brand loyalty. " },
    { lable: "Graphic Designing", path: '/services/graphic-designing', image: "/background/Graphic designer.png", accent: "139, 68, 226", description: "Transform your digital presence into a modern, user-friendly experience that captivates visitors and breathes new life into your business." },
    { lable: "Youtube ADS", path: '/services/youtube-ads', image: "/background/Youtub Ads (2).png", accent: "239, 31, 42", description: "We specialize in every YouTube ad format to align with your marketing goals – whether it’s brand awareness, engagement, or direct conversions." }
  ]

  return (
    <div className="root">
      <h2>Our <sapn className="h2-italic">Service</sapn></h2>
      <h4>Driving Digital Excellence with Tailored Solutions </h4>
      <p style={{ color: 'gray' }}>At Shabdd Technologies, we don't just offer services; we deliver expert-driven solutions designed to empower your business. Explore the unique advantages we bring to the table:</p>
      <div className='services'>
        {services.map((e, index) => (
          <Link className="service-link" to={e.path} key={e.path}>
            <div className='container' style={{ '--card-delay': `${index * 90}ms`, '--service-accent': e.accent }}>
              <div className="service-icon-box">
                <img src={e.image} alt="" />
              </div>
              <div className="service-card-content">
                <h3>{e.lable}</h3>
                <p className='description'>{e.description}</p>
                <span className="learn-more">Learn More <span aria-hidden="true">&rarr;</span></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Services;
