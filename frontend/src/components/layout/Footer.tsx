import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import type { CompanyData, FormStatus } from "../../types/site";
import StatusMessage from "../forms/StatusMessage";

type FooterProps = {
  company: CompanyData;
  newsletterStatus: FormStatus;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" }
];

export default function Footer({
  company,
  newsletterStatus,
  onSubmit
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <h3>{company.brand}</h3>
          <p>{company.tagline}</p>

          <div className="footer-contact-list">
            <span>
              <MapPin size={16} />
              {company.contact.address}
            </span>

            <span>
              <Phone size={16} />
              {company.contact.phone}
            </span>

            <span>
              <Mail size={16} />
              {company.contact.email}
            </span>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <nav>
            {footerLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <p>Get updates from Sumathi Printers.</p>

          <form onSubmit={onSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
            />

            <button type="submit" disabled={newsletterStatus === "loading"}>
              <Send size={16} />
            </button>
          </form>

          <StatusMessage
            status={newsletterStatus}
            success="Subscribed successfully."
          />
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {company.brand}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}