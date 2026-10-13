import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { imageAssets } from "../../data/imageAssets";
import { socialLinks } from "../../data/socialLinks";
import type { CompanyData } from "../../types/site";
import { useScrollLock } from "../../contexts/ScrollLockContext";
import QuoteButtonLink from "../common/QuoteButtonLink";

const MobileSidebar = lazy(() => import("../common/MobileSidebar"));

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
  const [isMenuPresent, setIsMenuPresent] = useState(false);
  const [isMobileNavigation, setIsMobileNavigation] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const { lock, unlock } = useScrollLock();

  // Ref to the toggle button so we can restore focus when the menu closes.
  const toggleRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const menuOpenRef = useRef(false);
  const focusFrameRef = useRef<number | null>(null);
  const isMenuActive = isMenuOpen || isMenuPresent;

  useEffect(() => {
    if (!isMenuOpen) return;
    lock();
    // Unlock before route scroll restoration runs, without waiting for the exit animation.
    return unlock;
  }, [isMenuOpen, lock, unlock]);

  const closeMenu = useCallback(() => {
    menuOpenRef.current = false;
    setIsMenuOpen(false);
  }, []);

  const closeMenuAndRestoreFocus = useCallback(() => {
    closeMenu();
    if (focusFrameRef.current !== null) cancelAnimationFrame(focusFrameRef.current);
    focusFrameRef.current = requestAnimationFrame(() => {
      toggleRef.current?.focus({ preventScroll: true });
      focusFrameRef.current = null;
    });
  }, [closeMenu]);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<number | null>(null);
  const isHovered = useRef(false);
  const lastScrollDirection = useRef<"up" | "down">("up");

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (hideTimeout.current !== null) window.clearTimeout(hideTimeout.current);
    hideTimeout.current = null;
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    if (window.scrollY <= 20) return;
    if (lastScrollDirection.current === "down") {
      setIsVisible(false);
      return;
    }
    hideTimeout.current = window.setTimeout(() => {
      if (!isHovered.current) setIsVisible(false);
      hideTimeout.current = null;
    }, 3000);
  };

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
        if (hideTimeout.current !== null) window.clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      } else {
        // We are scrolled down
        if (currentScrollY < lastScrollY.current) {
          // Scrolling UP
          lastScrollDirection.current = "up";
          setIsVisible(true);
          if (hideTimeout.current !== null) window.clearTimeout(hideTimeout.current);
          hideTimeout.current = null;
          if (!isHovered.current) {
            hideTimeout.current = window.setTimeout(() => {
              if (!isHovered.current) setIsVisible(false);
              hideTimeout.current = null;
            }, 3000);
          }
        } else if (currentScrollY > lastScrollY.current) {
          // Scrolling DOWN
          lastScrollDirection.current = "down";
          if (!isHovered.current) setIsVisible(false);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout.current !== null) window.clearTimeout(hideTimeout.current);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Close menu on route change                                          */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    closeMenu();
  }, [location.key, closeMenu]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 981px)");
    const closeOnDesktop = () => {
      setIsMobileNavigation(!desktop.matches);
      if (desktop.matches) {
        closeMenu();
        setIsMenuPresent(false);
      }
    };

    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [closeMenu]);

  /* ------------------------------------------------------------------ */
  /*  Cleanup pending focus restoration                                  */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    return () => {
      if (focusFrameRef.current !== null) cancelAnimationFrame(focusFrameRef.current);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Render                                                              */
  /* ------------------------------------------------------------------ */

  return (
    <>
      {/* ── Normal nav shell (stays inside the header) ── */}
      <header
        className={`sp-header ${isSticky ? "is-sticky" : ""} ${!isVisible && !isMenuActive ? "is-hidden" : ""} ${isMenuActive ? "has-mobile-menu" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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

          <div ref={shellRef} className="sp-nav-shell">
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
              id="sp-mobile-menu-toggle"
              className="sp-mobile-toggle sp-mobile-menu-toggle"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="sp-sidebar-panel"
              onClick={() => {
                if (menuOpenRef.current) {
                  closeMenu();
                } else {
                  menuOpenRef.current = true;
                  setIsMenuPresent(true);
                  setIsMenuOpen(true);
                }
              }}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {isMobileNavigation && (
        <Suspense fallback={null}>
          <MobileSidebar
            open={isMenuOpen}
            onClose={closeMenuAndRestoreFocus}
            onExitComplete={() => {
              if (!menuOpenRef.current) setIsMenuPresent(false);
            }}
            anchorRef={shellRef}
            toggleRef={toggleRef}
            links={navItems}
            contact={{ ...(company?.contact ?? company?.topBar), phoneLabel: "(+94)77 42 6900" }}
            socials={socialLinks}
          >
            <QuoteButtonLink variant="sidebar" onClick={closeMenuAndRestoreFocus} />
          </MobileSidebar>
        </Suspense>
      )}
    </>
  );
}
