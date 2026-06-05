import type { FormEvent } from "react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import type { CompanyData, FormStatus, ImageMap } from "../../../types/site";
import imagesJson from "../../../data/images.json";
import Badge from "../../../components/common/Badge";
import RevealTitle from "../../../components/common/RevealTitle";
import Reveal from "../../../components/common/Reveal";
import ImageHoverCard from "../../../components/cards/ImageHoverCard";
import StatusMessage from "../../../components/forms/StatusMessage";

const images = imagesJson as ImageMap;

type ContactSectionProps = {
  company: CompanyData;
  contactStatus: FormStatus;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ContactSection({
  company,
  contactStatus,
  onSubmit
}: ContactSectionProps) {
  const websiteUrl = company.contact.website.startsWith("http")
    ? company.contact.website
    : `https://${company.contact.website}`;

  const facebookUrl = company.contact.facebook.startsWith("http")
    ? company.contact.facebook
    : `https://${company.contact.facebook}`;

  return (
    <section id="contact" className="contact-section section-white">
      <div className="container contact-grid">
        <Reveal direction="left">
          <ImageHoverCard
            className="contact-art"
            src={images.ctaShirt}
            alt="Printed shirt detail"
            caption="Talk to our print specialists today"
          >
            <div className="contact-strip">
              <span>
                <Mail size={14} />
                {company.contact.email}
              </span>

              <span>
                <Phone size={14} />
                {company.contact.phone}
              </span>
            </div>
          </ImageHoverCard>
        </Reveal>

        <Reveal direction="right">
          <form className="contact-form" onSubmit={onSubmit}>
            <Badge left="Contact Us" right="Project Support" />

            <RevealTitle text="Tell Us What You Want To Print" />

            <div className="contact-info-list">
              <span>
                <MapPin size={17} />
                {company.contact.address}
              </span>

              <a href={`tel:${company.contact.phone}`}>
                <Phone size={17} />
                {company.contact.phone}
              </a>

              <a href={websiteUrl} target="_blank" rel="noreferrer">
                <Globe size={17} />
                {company.contact.website}
              </a>

              <a href={facebookUrl} target="_blank" rel="noreferrer">
                <span className="contact-social-mini">f</span>
                {company.contact.facebook}
              </a>
            </div>

            <input name="name" placeholder="Your full name" required />

            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
            />

            <input name="phone" placeholder="Phone number" />

            <input name="service" placeholder="Service type" />

            <textarea name="message" placeholder="Project details" required />

            <button
              className="form-submit"
              type="submit"
              disabled={contactStatus === "loading"}
            >
              {contactStatus === "loading" ? "Sending..." : "Send Message"}
            </button>

            <StatusMessage
              status={contactStatus}
              success="Message saved successfully."
            />
          </form>
        </Reveal>
      </div>
    </section>
  );
}