import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { imageAssets } from "../../data/imageAssets";
import { socialLinks } from "../../data/socialLinks";
import type { CompanyData } from "../../types/site";
import { useScrollLock } from "../../contexts/ScrollLockContext";
import QuoteButtonLink from "../common/QuoteButtonLink";

type NavigationBarProps = {
  company?: CompanyData;
};

const navItems = [
  { label: "Home",     to: "/" },
  { label: "About",    to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery",  to: "/gallery" },
  { label: "Contact",  to: "/contact" }
];

export default function NavigationBar({ company }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const { lock, unlock } = useScrollLock();

  // Ref to the toggle button so we can restore focus when the menu closes.
  const toggleRef = useRef<HTMLButtonElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<number | null>(null);

  /* ------------------------------------------------------------------ */
  /*  Sticky & Auto-hide detection                                        */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsSticky(currentScrollY > 20);

      if (currentScrollY <= 20) {
        // At the top, always visible
        setIsVisible(true);
        if (hideTimeout.current) window.clearTimeout(hideTimeout.current);
      } else {
        // We are scrolled down
        if (currentScrollY < lastScrollY.current) {
          // Scrolling UP
          setIsVisible(true);
          if (hideTimeout.current) window.clearTimeout(hideTimeout.current);
          hideTimeout.current = window.setTimeout(() => {
            setIsVisible(false);
          }, 3000);
        } else if (currentScrollY > lastScrollY.current) {
          // Scrolling DOWN
          setIsVisible(false);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout.current) window.clearTimeout(hideTimeout.current);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Close menu on route change                                          */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  /* ------------------------------------------------------------------ */
  /*  Lenis scroll-lock + Escape key                                      */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (isMenuOpen) {
      lock();
    } else {
      unlock();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  /* ------------------------------------------------------------------ */
  /*  Cleanup: ensure body is never permanently locked                    */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    return () => {
      unlock();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                             */
  /* ------------------------------------------------------------------ */

  const closeMenu = () => {
    setIsMenuOpen(false);
    // Restore focus to the toggle button.
    requestAnimationFrame(() => {
      toggleRef.current?.focus();
    });
  };

  /* ------------------------------------------------------------------ */
  /*  Portal targets                                                       */
  /* ------------------------------------------------------------------ */

  // Backdrop and sidebar are portalled directly into document.body so they
  // escape the header's stacking context and sit above everything else.
  const portalTarget =
    typeof document !== "undefined" ? document.body : null;

  /* ------------------------------------------------------------------ */
  /*  Render                                                              */
  /* ------------------------------------------------------------------ */

  return (
    <>
      {/* ── Normal nav shell (stays inside the header) ── */}
      <header className={`sp-header ${isSticky ? "is-sticky" : ""} ${!isVisible ? "is-hidden" : ""}`}>
        <div className="container sp-nav-container">
          <div className="sp-nav-socials" aria-label="Social links">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="sp-nav-social-link"
                  target={social.href === "#" ? undefined : "_blank"}
                  rel={social.href === "#" ? undefined : "noreferrer"}
                >
                  <Icon width={22} height={22} />
                </a>
              );
            })}
          </div>

          <div className="sp-nav-shell">
            <Link to="/" className="sp-brand" onClick={closeMenu}>
              <img
                src={imageAssets.logo.main}
                alt={company?.brand || "Sumathi Printers"}
                className="sp-brand-logo"
                loading="eager"
                decoding="async"
                fetchPriority="high"
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

            {/* Navbar "Get a Quote" – hidden on mobile by CSS */}
            <QuoteButtonLink variant="navbar" onClick={closeMenu} />

            <button
              ref={toggleRef}
              type="button"
              className="sp-mobile-toggle"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="sp-sidebar-panel"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Portal: backdrop + sidebar – rendered directly into document.body ── */}
      {portalTarget &&
        createPortal(
          <>
            {/* Backdrop – blurs and darkens everything behind the sidebar */}
            <button
              type="button"
              className={`sp-mobile-backdrop ${isMenuOpen ? "is-open" : ""}`}
              aria-label="Close menu"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={closeMenu}
            />

            {/* Sidebar panel */}
            <aside
              id="sp-sidebar-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className={`sp-mobile-menu ${isMenuOpen ? "is-open" : ""}`}
              // Lenis must not handle wheel/touch events inside the sidebar.
              data-lenis-prevent
            >
              <div className="sp-mobile-menu-head">
                <img
                  src={imageAssets.logo.main}
                  alt={company?.brand || "Sumathi Printers"}
                  className="sp-mobile-menu-logo"
                  loading="eager"
                  decoding="async"
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

              <nav
                className="sp-mobile-nav-links"
                aria-label="Mobile navigation"
              >
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `sp-mobile-nav-link ${isActive ? "active" : ""}`
                    }
                    style={
                      { "--delay": `${index * 55}ms` } as React.CSSProperties
                    }
                    onClick={closeMenu}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Sidebar "Get a Quote" – uses exact same component as navbar */}
              <QuoteButtonLink variant="sidebar" onClick={closeMenu} />
            </aside>
          </>,
          portalTarget
        )}
    </>
  );
}
