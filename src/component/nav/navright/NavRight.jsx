import React from 'react'
import './NavRight.css'
import {Link} from "react-router-dom"
function NavRight({ onNavigate }) {
  return (
    <div className='book-demo'>
      <Link to="/contact" onClick={onNavigate}><button>BOOK A DEMO</button></Link>
    
    </div>
  )
}

export default NavRight;
