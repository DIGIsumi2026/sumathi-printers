/**
 * QuoteButtonLink
 *
 * A reusable "Get a Quote" pill button that uses the exact same chasing-streak
 * SVG border system as the navbar button (.sp-nav-quote-final).
 *
 * Variants:
 *   "navbar"  – fixed 156 × 58 px pill (default, matches the nav button)
 *   "sidebar" – width: 100%, slightly taller (fills the sidebar bottom area)
 *
 * Both variants share:
 *   - white / glass inner fill
 *   - blue → purple → pink chasing conic-gradient border streak
 *   - glow ::after pseudo-element
 *   - shine overlay
 *   - hover lift + active scale
 *   - identical animation timing (spChaseStreak 2.45s)
 *   - identical typography
 *
 * Each instance generates unique SVG gradient IDs via React.useId() so
 * multiple instances on the same page never share a duplicate gradient id.
 */

import { useId } from "react";
import { Link } from "react-router-dom";

type QuoteButtonLinkProps = {
  /** Visual / sizing variant. */
  variant?: "navbar" | "sidebar";
  /** Called after the link is activated (e.g. to close the sidebar). */
  onClick?: () => void;
};

export default function QuoteButtonLink({
  variant = "navbar",
  onClick
}: QuoteButtonLinkProps) {
  // Unique id prefix so SVG gradient references never collide across instances.
  const uid = useId();
  const gradientId = `spQuoteGrad-${uid.replace(/:/g, "")}`;

  const className = [
    "sp-nav-quote-final",
    variant === "sidebar" ? "sp-quote-btn--sidebar" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      to="/contact"
      className={className}
      onClick={onClick}
      data-cursor-label="Quote"
      aria-label="Get a Quote"
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
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%"   stopColor="#38c7ff" />
            <stop offset="25%"  stopColor="#4e8dff" />
            <stop offset="48%"  stopColor="#7a4dff" />
            <stop offset="68%"  stopColor="#e72a9a" />
            <stop offset="84%"  stopColor="#ff7a3d" />
            <stop offset="100%" stopColor="#39d98a" />
          </linearGradient>
        </defs>

        <rect
          className="sp-nav-quote-final-track"
          x="3" y="3" width="172" height="52" rx="26" ry="26"
          pathLength="100"
        />

        <rect
          className="sp-nav-quote-final-runner-glow"
          x="3" y="3" width="172" height="52" rx="26" ry="26"
          pathLength="100"
          stroke={`url(#${gradientId})`}
        />

        <rect
          className="sp-nav-quote-final-runner"
          x="3" y="3" width="172" height="52" rx="26" ry="26"
          pathLength="100"
          stroke={`url(#${gradientId})`}
        />
      </svg>

      <span className="sp-nav-quote-final-shine" aria-hidden="true" />
      <span className="sp-nav-quote-final-text">Get a Quote</span>
    </Link>
  );
}
