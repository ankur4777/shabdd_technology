import "./NavLogo.css"
import {Link} from "react-router-dom"

function NavLogo() {
  return (
    <div className="nav-logo">
      <Link to="/">
      <img src="/Logo.png" alt="Logo" />
      </Link>
    </div>
  );
}

export default NavLogo;
