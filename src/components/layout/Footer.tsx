import { Link } from "react-router-dom";
import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Link to="/">JORDAN LY</Link>
        <p>Personal training focused on strength, movement, and progress.</p>
      </div>

      <nav className="footer__links" aria-label="Footer navigation">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <p className="footer__copyright">
        © 2026 Jordan Ly. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;