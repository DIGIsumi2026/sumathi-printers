import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { imageAssets } from "../../data/imageAssets";
import type { CompanyData } from "../../types/site";

type NavigationBarProps = {
  company?: CompanyData;
};

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" }
];

export default function NavigationBar({ company }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("sp-menu-open", isMenuOpen);

    return () => {
      document.body.classList.remove("sp-menu-open");
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`sp-header ${isSticky ? "is-sticky" : ""}`}>
      <div className="container sp-nav-container">
        <div className="sp-nav-shell">
          <Link to="/" className="sp-brand" onClick={closeMenu}>
            <img
              src={imageAssets.logo.main}
              alt={company?.brand || "Sumathi Printers"}
              className="sp-brand-logo"
            />
          </Link>

          <nav className="sp-nav-links" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `sp-nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
  to="/contact"
  className="sp-nav-quote-final"
  onClick={closeMenu}
  data-cursor-label="Quote"
>
  <span className="sp-nav-quote-final-bg" aria-hidden="true" />

  <svg
    className="sp-nav-quote-final-svg"
    viewBox="0 0 178 58"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient
        id="spNavQuoteFinalGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#38c7ff" />
        <stop offset="25%" stopColor="#4e8dff" />
        <stop offset="48%" stopColor="#7a4dff" />
        <stop offset="68%" stopColor="#e72a9a" />
        <stop offset="84%" stopColor="#ff7a3d" />
        <stop offset="100%" stopColor="#39d98a" />
      </linearGradient>
    </defs>

    <rect
      className="sp-nav-quote-final-track"
      x="3"
      y="3"
      width="172"
      height="52"
      rx="26"
      ry="26"
      pathLength="100"
    />

    <rect
      className="sp-nav-quote-final-runner-glow"
      x="3"
      y="3"
      width="172"
      height="52"
      rx="26"
      ry="26"
      pathLength="100"
    />

    <rect
      className="sp-nav-quote-final-runner"
      x="3"
      y="3"
      width="172"
      height="52"
      rx="26"
      ry="26"
      pathLength="100"
    />
  </svg>

  <span className="sp-nav-quote-final-shine" aria-hidden="true" />
  <span className="sp-nav-quote-final-text">Get a Quote</span>
</Link>
          <button
            type="button"
            className="sp-mobile-toggle"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <aside className={`sp-mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
          <div className="sp-mobile-menu-head">
            <img
              src={imageAssets.logo.main}
              alt={company?.brand || "Sumathi Printers"}
              className="sp-mobile-menu-logo"
            />

            <button
              type="button"
              className="sp-mobile-menu-close"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X size={22} />
            </button>
          </div>

          <nav className="sp-mobile-nav-links" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `sp-mobile-nav-link ${isActive ? "active" : ""}`
                }
                style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}
                onClick={closeMenu}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="sp-mobile-quote-button"
            onClick={closeMenu}
          >
            <span>Get Quote</span>
          </Link>
        </aside>
      </div>

      <button
        type="button"
        className={`sp-mobile-backdrop ${isMenuOpen ? "is-open" : ""}`}
        aria-label="Close menu"
        onClick={closeMenu}
      />
    </header>
  );
}