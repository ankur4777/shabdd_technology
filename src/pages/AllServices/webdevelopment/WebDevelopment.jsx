import React from 'react'
import Banner from '../Banner'
import servicesData from '../serviceData'
import './WebDevelopment.css'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const webServiceItems = [
  { path: "/allservices/web development/mobile.png", label: 'Web Portals' },
  { path: "/allservices/web development/E-commerce.png", label: 'E-commerce Websites' },
  { path: "/allservices/web development/Online Store.png", label: 'Online Store' },
  { path: "/allservices/web development/CMS.png", label: 'CMS' },
  { path: "/allservices/web development/MarketPlace.png", label: 'Marketplace' },
  { path: "/allservices/web development/Real time web aap .png", label: 'Real-time web Application' },
  { path: "/allservices/web development/CRM.png", label: 'CRM' },
  { path: "/allservices/web development/Data Driven.png", label: 'Data-Driven Application' },
  { path: "/allservices/web development/mobile.png", label: 'Mobile Apps' },
  { path: "/allservices/web development/MLM Software.png", label: 'MLM Software' },
  { path: "/allservices/web development/Progressive aap.png", label: 'Progressive Web App' },
  { path: "/allservices/web development/Customer Software.png", label: 'Custom Software' },
]

const autoSlideItems = [...webServiceItems, ...webServiceItems]

function WebDevelopment() {
  return (

    <>
    <div>
      
      <Banner {...servicesData['web-development']} />
      

      <div className="web-container">
        <div className='web-left-text'>
          <h1>A Full-Scale <span>Website Design & Development</span> Agency in India</h1>
          <h5>At Shabdd Technology delivers end-to-end website design and development to help your brand shine online. With responsive, secure, and scalable websites, we ensure your business stands out in today's digital world.</h5>
        </div>

        <img src="/allservicetext/1.png" alt="Web Development" />

      </div>
      
      <div className="web-services-strip" aria-label="Website development services">
        <button className="web-strip-arrow web-strip-arrow-left" type="button" aria-label="Previous service">
          <IoChevronBack />
        </button>

        <div className="web-services-list">
          {autoSlideItems.map(({ path, label }, index) => (
            <div className="web-service-item" key={`${label}-${index}`}>
              <span className="web-service-icon">
                <img src={path} alt={label} />
              </span>
              <span className="web-service-label">{label}</span>
            </div>
          ))}
        </div>

        <button className="web-strip-arrow web-strip-arrow-right" type="button" aria-label="Next service">
          <IoChevronForward />
        </button>
      </div>

    </div>
    </>
  )
}

export default WebDevelopment
