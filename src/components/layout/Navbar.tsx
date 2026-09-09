import { NavLink, Link } from "react-router-dom";
import "../../styles/navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        JORDAN LY
      </Link>

      <nav className="navbar__links" aria-label="Main navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar__link navbar__link--active" : "navbar__link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "navbar__link navbar__link--active" : "navbar__link"
          }
        >
          Services
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "navbar__link navbar__link--active" : "navbar__link"
          }
        >
          Contact
        </NavLink>
      </nav>

      <Link to="/contact" className="navbar__cta">
        Start Training
      </Link>
    </header>
  );
}

export default Navbar;