import type { FormEvent, SVGProps } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Clock,
  MapPin,
  Phone
} from "lucide-react";
import { imageAssets } from "../../data/imageAssets";
import type { CompanyData, FormStatus } from "../../types/site";

type FooterProps = {
  company: CompanyData;
  newsletterStatus?: FormStatus;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.2 8.3V6.9c0-.7.2-1.1 1.2-1.1h1.5V3.1c-.7-.1-1.5-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9v1.4H8.4v3h2.5V21h3.1v-9.7h2.6l.4-3h-2.8z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.6 9.3H3.5V21h3.1V9.3zM5.1 3C4 3 3.2 3.8 3.2 4.8s.8 1.8 1.9 1.8S7 5.8 7 4.8 6.2 3 5.1 3zM20.8 14.3c0-3.1-1.7-5.2-4.4-5.2-1.8 0-2.7 1-3.2 1.8V9.3h-3V21h3.1v-6.4c0-1.7.9-2.7 2.3-2.7 1.3 0 2.1.9 2.1 2.8V21h3.1v-6.7z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" }
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1cULUwBvV1/?mibextid=wwXIfr",
    icon: FacebookIcon
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sumathiprinters?igsh=MXM3NHltMnJrYjU4dQ==",
    icon: InstagramIcon
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sumathi-printers/",
    icon: LinkedInIcon
  }
];

const mapOpenUrl = "https://maps.app.goo.gl/Nw17Q4kt9Z8kUKok9";

const mapEmbedUrl =
  "https://www.google.com/maps?q=445%2F1%20Sirimavo%20Bandaranaike%20Mawatha%2C%20Colombo%2014%2C%20Sri%20Lanka&output=embed";

export default function Footer({
  company,
  newsletterStatus: _newsletterStatus,
  onSubmit: _onSubmit
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sp-footer">
      <span className="sp-footer-watermark">SUMATHI</span>

      <span className="sp-footer-orb sp-footer-orb-one" />
      <span className="sp-footer-orb sp-footer-orb-two" />
      <span className="sp-footer-ring sp-footer-ring-one" />
      <span className="sp-footer-ring sp-footer-ring-two" />

      <div className="container sp-footer-container">
        <div className="sp-footer-grid">
          <div className="sp-footer-brand-column">
            <Link
              to="/"
              className="sp-footer-logo-card"
              aria-label="Go to home page"
            >
              <span className="sp-footer-logo-glow" />

              <img
                src={imageAssets.logo.main}
                alt={company?.brand || "Sumathi Printers"}
                className="sp-footer-logo"
                draggable={false}
              />
            </Link>

            <p>
              Premium printing, publishing, packaging and finishing solutions
              crafted with precision, consistency and professional care.
            </p>

            <div className="sp-footer-socials" aria-label="Social links">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="sp-footer-social-link"
                    target={social.href === "#" ? undefined : "_blank"}
                    rel={social.href === "#" ? undefined : "noreferrer"}
                  >
                    <Icon width={18} height={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="sp-footer-column">
            <h3>Quick Links</h3>

            <nav className="sp-footer-link-list" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.to} className="sp-footer-link">
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </nav>
          </div>

          <div className="sp-footer-column">
            <h3>Contact</h3>

            <div className="sp-footer-contact-list">
              <a
                href={mapOpenUrl}
                target="_blank"
                rel="noreferrer"
                className="sp-footer-contact-item"
              >
                <span>
                  <MapPin size={18} />
                </span>

                <p>
                  445/1, Sirimawo Bandaranayaka Mawatha,
                  <br />
                  Colombo 14, Sri Lanka
                </p>
              </a>

              <a href="tel:+9477426900" className="sp-footer-contact-item">
                <span>
                  <Phone size={18} />
                </span>

                <p>(+94)77 42 6900</p>
              </a>

              <div className="sp-footer-contact-item">
                <span>
                  <Clock size={18} />
                </span>

                <p>
                  Monday – Friday: 8:30 AM – 5:00 PM
                  <br />
                  Saturday & Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="sp-footer-map-column">
            <h3>Location</h3>

            <div className="sp-footer-map-card">
              <iframe
                title="Sumathi Printers location preview"
                src={mapEmbedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="sp-footer-map-overlay" />
            </div>

            <a
              href={mapOpenUrl}
              target="_blank"
              rel="noreferrer"
              className="sp-footer-map-button"
            >
              <span>View on Google Maps</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="sp-footer-bottom">
          <p>© {currentYear} Sumathi Printers. All rights reserved.</p>

          <span>Designed for premium print excellence.</span>
        </div>
      </div>
    </footer>
  );
}