import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { imageAssets } from "../../data/imageAssets";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Finishing", href: "#finishing" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" }
];

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);

      const sections = navItems
        .map((item) => item.href.replace("#", ""))
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`sp-header ${isSticky ? "is-sticky" : ""}`}>
      <div className="container sp-nav-container">
        <a href="#home" className="sp-brand" onClick={closeMenu}>
          <img
          src={imageAssets.logo.main}
          alt="Sumathi Printers"
          className="sp-brand-logo"
          />
        </a>

        <nav className="sp-nav-pill" aria-label="Primary navigation">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`sp-nav-link ${isActive ? "active" : ""}`}
              >
                {item.label}
              </a>
            );
          })}

          <a href="#contact" className="sp-quote-button">
            <span>Get Quote</span>
          </a>
        </nav>

        <button
          type="button"
          className="sp-mobile-toggle"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      <div className={`sp-mobile-panel ${isMenuOpen ? "is-open" : ""}`}>
        <div className="sp-mobile-panel-inner">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`sp-mobile-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href="#contact"
            className="sp-mobile-quote-button"
            onClick={closeMenu}
          >
            <span>Get Quote</span>
          </a>
        </div>
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