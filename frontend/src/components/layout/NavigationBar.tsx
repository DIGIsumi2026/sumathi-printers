import {
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import company from "../../data/company.json";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Finishing", href: "#finishing" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" }
];

const socialLinks = [
  {
    label: "Facebook",
    shortLabel: "f",
    href: "https://www.facebook.com"
  },
  {
    label: "Instagram",
    shortLabel: "ig",
    href: "https://www.instagram.com"
  },
  {
    label: "LinkedIn",
    shortLabel: "in",
    href: "https://www.linkedin.com"
  }
];

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 120);

      const sections = navItems
        .map((item) => item.href.replace("#", ""))
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 160 && rect.bottom >= 160;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`site-header ${isSticky ? "is-sticky" : ""}`}>
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-contact">
            <a href={`tel:${company.contact.phone}`} className="top-contact-link">
              <Phone size={15} strokeWidth={2.2} />
              <span>{company.contact.phone}</span>
            </a>

            <a href={`mailto:${company.contact.email}`} className="top-contact-link">
              <Mail size={15} strokeWidth={2.2} />
              <span>{company.contact.email}</span>
            </a>

            <span className="top-contact-link top-address">
              <MapPin size={15} strokeWidth={2.2} />
              <span>{company.contact.address}</span>
            </span>
          </div>

          <div className="top-social">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="social-pill"
                target="_blank"
                rel="noreferrer"
              >
                {item.shortLabel}
              </a>
            ))}
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <div className="container nav-inner">
          <a href="#home" className="brand" onClick={closeMobileMenu}>
            <span className="brand-mark">S</span>
            <span className="brand-copy">
              <strong>SUMATHI</strong>
              <small>PRINTERS</small>
            </span>
          </a>

          <div className={`nav-links ${isMenuOpen ? "is-open" : ""}`}>
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <span>{item.label}</span>
                  {item.label === "Services" && (
                    <ChevronDown size={14} strokeWidth={2.4} />
                  )}
                </a>
              );
            })}
          </div>

          <div className="nav-actions">
            <button className="nav-search" type="button" aria-label="Search">
              <Search size={18} strokeWidth={2.3} />
            </button>

            <a href="#contact" className="nav-quote">
              Get Quote
            </a>

            <button
              className="menu-toggle"
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}