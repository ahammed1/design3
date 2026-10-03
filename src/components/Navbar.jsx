import { useState } from "react";
import { Menu, PlaneTakeoff, X } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#popular-packages" },
  { label: "Experiences", href: "#experiences" },
  { label: "Services", href: "#travel-services" },
  { label: "About", href: "#about" },
  { label: "Admin", to: "/admin/sign-in" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <a className="navbar-brand" href="#home" onClick={closeMenu} aria-label="xxxxxx home">
        <span className="navbar-brand-icon">
          <PlaneTakeoff size={18} aria-hidden="true" />
        </span>
        <span>xxxxxx</span>
      </a>

      <button
        className="navbar-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      <nav
        className={`navbar-navigation${menuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-links">
          {navItems.map((item) => item.to ? (
            <Link key={item.to} to={item.to} onClick={closeMenu}>{item.label}</Link>
          ) : (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
        </div>
        <a className="navbar-cta" href="#home-trip-planner" onClick={closeMenu}>
          Plan a trip
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
