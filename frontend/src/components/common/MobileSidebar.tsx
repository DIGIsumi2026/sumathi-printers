import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode, RefObject, SVGProps } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  onExitComplete: () => void;
  anchorRef: RefObject<HTMLDivElement>;
  toggleRef: RefObject<HTMLButtonElement>;
  links: ReadonlyArray<{ label: string; to: string }>;
  contact?: { email?: string; phone?: string };
  socials: ReadonlyArray<{
    label: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
  }>;
  children?: ReactNode;
};

function MobileSidebarPanel({
  onClose, anchorRef, toggleRef, links, contact, socials, children
}: Omit<MobileSidebarProps, "open" | "onExitComplete">) {
  const reducedMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const [bounds, setBounds] = useState({ top: 90, left: 16, width: 0 });

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const updateBounds = () => {
      const rect = anchor.getBoundingClientRect();
      setBounds({ top: rect.bottom + 10, left: rect.left, width: rect.width });
    };
    updateBounds();
    const observer = new ResizeObserver(updateBounds);
    observer.observe(anchor);
    window.visualViewport?.addEventListener("resize", updateBounds);
    return () => {
      observer.disconnect();
      window.visualViewport?.removeEventListener("resize", updateBounds);
    };
  }, [anchorRef]);

  useEffect(() => {
    const inertElements = new Map<HTMLElement, boolean>();
    // Leave the navbar and portal interactive, making only background branches inert.
    let branch: HTMLElement | null = anchorRef.current?.closest("header") ?? null;
    while (branch && branch !== document.body) {
      const parent: HTMLElement | null = branch.parentElement;
      if (!parent) break;
      for (const sibling of Array.from(parent.children)) {
        if (sibling instanceof HTMLElement && sibling !== branch &&
            !sibling.contains(layerRef.current) &&
            !["SCRIPT", "STYLE", "LINK"].includes(sibling.tagName)) {
          inertElements.set(sibling, sibling.inert);
          sibling.inert = true;
        }
      }
      branch = parent;
    }

    const getControls = () => [
      toggleRef.current,
      ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex="0"]'
      ) ?? [])
    ].filter((element): element is HTMLElement => Boolean(element));
    const focusFirstLink = () => {
      panelRef.current?.querySelector<HTMLElement>("nav a")?.focus({ preventScroll: true });
    };
    const frame = requestAnimationFrame(focusFirstLink);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const controls = getControls();
      const index = controls.indexOf(document.activeElement as HTMLElement);
      if (index === -1 || (event.shiftKey && index === 0) ||
          (!event.shiftKey && index === controls.length - 1)) {
        event.preventDefault();
        controls[event.shiftKey ? controls.length - 1 : 0]?.focus({ preventScroll: true });
      }
    };
    const containFocus = (event: FocusEvent) => {
      if (event.target !== toggleRef.current &&
          !panelRef.current?.contains(event.target as Node)) focusFirstLink();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", containFocus);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", containFocus);
      inertElements.forEach((wasInert, element) => { element.inert = wasInert; });
    };
  }, [anchorRef, toggleRef, onClose]);

  const panelVariants: Variants = {
    closed: {
      opacity: 0, y: reducedMotion ? 0 : -10, scale: reducedMotion ? 1 : 0.988,
      transition: {
        duration: reducedMotion ? 0.05 : 0.24, ease: [0.4, 0, 1, 1],
        staggerChildren: reducedMotion ? 0 : 0.015, staggerDirection: -1
      }
    },
    open: {
      opacity: 1, y: 0, scale: 1,
      transition: {
        duration: reducedMotion ? 0.05 : 0.34, ease: [0.22, 1, 0.36, 1],
        delayChildren: reducedMotion ? 0 : 0.02, staggerChildren: reducedMotion ? 0 : 0.03
      }
    }
  };
  const itemVariants: Variants = {
    closed: { opacity: 0, y: reducedMotion ? 0 : 5, transition: { duration: reducedMotion ? 0.05 : 0.14 } },
    open: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.05 : 0.24 } }
  };
  const contactVariants: Variants = {
    ...itemVariants,
    open: { opacity: 1, y: 0, transition: { duration: reducedMotion ? 0.05 : 0.22 } }
  };
  const socialVariants: Variants = {
    closed: { opacity: 0, y: reducedMotion ? 0 : 4, scale: reducedMotion ? 1 : 0.94, transition: { duration: reducedMotion ? 0.05 : 0.14 } },
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: reducedMotion ? 0.05 : 0.24 } }
  };

  return (
    <motion.div ref={layerRef} className="sp-mobile-sidebar-layer" initial="closed" animate="open" exit="closed">
      <motion.button
        type="button"
        className="sp-mobile-sidebar-backdrop"
        aria-label="Close navigation menu"
        tabIndex={-1}
        onClick={onClose}
        variants={{
          open: { opacity: 1, transition: { duration: reducedMotion ? 0.05 : 0.22 } },
          closed: { opacity: 0, transition: { duration: reducedMotion ? 0.05 : 0.18 } }
        }}
      />
      <motion.aside
        ref={panelRef}
        id="sp-sidebar-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-owns="sp-mobile-menu-toggle"
        className="sp-mobile-sidebar-panel"
        data-lenis-prevent
        variants={panelVariants}
        style={{ top: bounds.top, left: bounds.left, width: bounds.width || "calc(100% - 32px)", maxHeight: `calc(100dvh - ${bounds.top + 12}px)` }}
      >
        <nav aria-label="Mobile navigation" className="sp-mobile-sidebar-links">
          {links.map((item) => (
            <motion.div key={item.to} variants={itemVariants} className="sp-mobile-sidebar-item">
              <NavLink to={item.to} end={item.to === "/"} onClick={onClose}
                className={({ isActive }) => `sp-mobile-sidebar-link${isActive ? " is-active" : ""}`}>
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>
        {children && <motion.div variants={itemVariants} className="sp-mobile-sidebar-quote">{children}</motion.div>}
        {(contact?.email || contact?.phone) && (
          <motion.div variants={contactVariants} className="sp-mobile-sidebar-contact">
            {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
            {contact.phone && <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a>}
          </motion.div>
        )}
        {socials.length > 0 && (
          <motion.div variants={socialVariants} className="sp-mobile-sidebar-socials" role="group" aria-label="Social links">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} title={label} target="_blank" rel="noopener noreferrer">
                <Icon width={20} height={20} />
              </a>
            ))}
          </motion.div>
        )}
      </motion.aside>
    </motion.div>
  );
}

export default function MobileSidebar({ open, onExitComplete, ...props }: MobileSidebarProps) {
  return createPortal(
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && <MobileSidebarPanel key="mobile-navigation" {...props} />}
    </AnimatePresence>,
    document.body
  );
}
