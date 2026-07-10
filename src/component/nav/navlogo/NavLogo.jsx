import "./NavLogo.css"
import {Link} from "react-router-dom"

function NavLogo({ isScrolled = false }) {
  return (
    <div className="nav-logo">
      <Link to="/">
      <img src={isScrolled ? "/Logo.png" : "/Logo-white-2.png"} alt="Logo" />
      </Link>
    </div>
  );
}

export default NavLogo;
