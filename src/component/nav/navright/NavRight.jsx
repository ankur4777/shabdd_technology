import React from 'react'
import './NavRight.css'
import {Link} from "react-router-dom"
function NavRight({ onNavigate }) {
  return (
    <div className='book-demo'>
      <Link to="/contact" onClick={onNavigate}>
        <button onClick={()=>{window.open("https://wa.me/917347673924")}}>
          <span>BOOK A DEMO</span>
        </button>
      </Link>
    
    </div>
  )
}

export default NavRight;
