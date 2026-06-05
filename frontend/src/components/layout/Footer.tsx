import {
  ArrowUpRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  Printer,
  Send
} from "lucide-react";
import company from "../../data/company.json";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Finishing Services", href: "#finishing" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" }
];

const services = [
  "Offset Printing",
  "Graphic Designing",
  "Packaging Box Printing",
  "Books & Magazine Printing",
  "Stickers & Labels",
  "Brochures & Catalogs"
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer-top">
        <div className="container footer-cta">
          <div>
            <span className="footer-cta-label">Let’s print your next idea</span>
            <h2>Need high quality printing for your business?</h2>
          </div>

          <a href="#contact" className="footer-cta-button">
            Request Quote
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </a>
        </div>
      </div>

      <div className="container footer-main">
        <div className="footer-column footer-brand-column">
          <a href="#home" className="footer-brand">
            <span className="footer-brand-mark">
              <Printer size={30} strokeWidth={2.1} />
            </span>

            <span>
              <strong>SUMATHI</strong>
              <small>PRINTERS</small>
            </span>
          </a>

          <p className="footer-description">
            {company.legalName} provides comprehensive printing solutions with modern
            equipment, reliable delivery, competitive pricing, and professional
            customer service.
          </p>

          <div className="footer-social">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="footer-social-link"
                target="_blank"
                rel="noreferrer"
              >
                {item.shortLabel}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>

          <ul className="footer-list">
            {footerLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href}>
                  <span>{item.label}</span>
                  <ArrowUpRight size={13} strokeWidth={2.3} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>

          <ul className="footer-list">
            {services.map((item) => (
              <li key={item}>
                <a href="#services">
                  <span>{item}</span>
                  <ArrowUpRight size={13} strokeWidth={2.3} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column footer-contact-column">
          <h3>Contact Info</h3>

          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-icon">
                <MapPin size={17} strokeWidth={2.2} />
              </span>
              <span>{company.contact.address}</span>
            </li>

            <li>
              <span className="footer-contact-icon">
                <Phone size={17} strokeWidth={2.2} />
              </span>
              <a href={`tel:${company.contact.phone}`}>
                {company.contact.phone}
              </a>
            </li>

            <li>
              <span className="footer-contact-icon">
                <Mail size={17} strokeWidth={2.2} />
              </span>
              <a href={`mailto:${company.contact.email}`}>
                {company.contact.email}
              </a>
            </li>

            <li>
              <span className="footer-contact-icon">
                <Globe size={17} strokeWidth={2.2} />
              </span>
              <a
                href={`https://${company.contact.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {company.contact.website}
              </a>
            </li>
          </ul>

          <form className="footer-newsletter">
            <input type="email" placeholder="Email address" />
            <button type="button" aria-label="Subscribe">
              <Send size={17} strokeWidth={2.4} />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {currentYear} Sumathi Printers. All Rights Reserved.</p>

          <div className="footer-bottom-links">
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}