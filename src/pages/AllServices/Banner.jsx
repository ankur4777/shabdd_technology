import React from 'react'
import './Banner.css'

function Banner({ title, subtitle, description }) {
  return (
    <div>
      <div className="allservices-banner" style={{marginTop:"100px"}}>
        <img src="/allservices/Banner-all.png" alt="Banner background" />
        <div className="allservices-banner-text">
          <h4>{subtitle}</h4>
          <h1>{title}</h1>
          <p className="for-p-tag">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Banner
