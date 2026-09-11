import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <Link
        to="/"
        className="navbar__brand"
        onClick={closeMenu}
      >
        JORDAN LY
      </Link>

      <nav
        className={`navbar__links ${
          menuOpen ? "navbar__links--open" : ""
        }`}
        aria-label="Main navigation"
      >
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "navbar__link navbar__link--active"
              : "navbar__link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/services"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "navbar__link navbar__link--active"
              : "navbar__link"
          }
        >
          Services
        </NavLink>

        <NavLink
          to="/contact"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "navbar__link navbar__link--active"
              : "navbar__link"
          }
        >
          Contact
        </NavLink>
      </nav>

      <Link
        to="/contact"
        className="navbar__cta"
        onClick={closeMenu}
      >
        Start Training
      </Link>

      <button
        type="button"
        className="navbar__menu-button"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

export default Navbar;