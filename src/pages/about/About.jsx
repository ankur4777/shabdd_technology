import React from 'react'
import './About.css'
import Top from './component/top/Top'
import Middle from './component/middle/Middle'
import Bottom from './component/bottom/Bottom'

function About() {
  return (
   <>
   <div style={{marginTop: "100px" }}>

      <Top/>
    <Middle/>
    <Bottom/>
   </div>
  

    
   </>
  )
}

export default About;