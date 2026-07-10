import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import type { CompanyData, FormStatus } from "../../../types/site";

type ContactMainBlockProps = {
  company: CompanyData;
  contactStatus: FormStatus;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const whatsappMessage = encodeURIComponent(
  "Hello Sumathi Printers, I would like to get a quote for a printing project."
);

const whatsappLink = `https://wa.me/9477426900?text=${whatsappMessage}`;

const contactItems = [
  {
    icon: MapPin,
    label: "Office & Facility",
    value: (
      <>
        445/1, Sirimawo Bandaranayaka Mawatha,
        <br />
        Colombo 14, Sri Lanka
      </>
    )
  },
  {
    icon: Phone,
    label: "Direct Line",
    value: "(+94) 77 42 6900"
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: (
      <>
        Monday – Friday: 8:30 AM – 5:00 PM
        <br />
        Saturday & Sunday: Closed
      </>
    )
  }
];

export default function ContactMainBlock({
  company: _company,
  contactStatus,
  onSubmit
}: ContactMainBlockProps) {
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({
    service: "Offset Printing"
  });

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;

    setFieldValues((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleFormReset = () => {
    setFieldValues({ service: "Offset Printing" });
  };

  const getFieldClassName = (name: string, className = "") => {
    const classes = ["sp-contact-field", className];

    if (fieldValues[name]) {
      classes.push("has-value");
    }

    return classes.filter(Boolean).join(" ");
  };

  return (
    <section id="contact-main-block" className="sp-contact-main-section" data-watermark-section>
      <span className="sp-contact-watermark sp-contact-watermark-right" data-section-watermark>
        INQUIRY
      </span>

      <span className="sp-contact-orb sp-contact-main-orb-one" />
      <span className="sp-contact-orb sp-contact-main-orb-two" />
      <span className="sp-contact-ring sp-contact-main-ring-one" />
      <span className="sp-contact-shape sp-contact-main-shape-one" />

      <div className="container sp-contact-main-container">
        <motion.div
          className="sp-contact-info-panel"
          initial={{ opacity: 0, x: -44, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.26 }}
          transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-contact-pill sp-contact-pill-light">
            <Sparkles size={15} />
            <span>We’re Ready To Help</span>
          </div>

          <h2 className="sp-section-heading">Talk to our team about your next print project.</h2>

          <p>
            Reach out for printing, packaging, publishing, stationery, finishing
            services, or customized project requirements.
          </p>

          <div className="sp-contact-info-list">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="sp-contact-info-item">
                  <span className="sp-contact-info-icon">
                    <Icon size={20} />
                  </span>

                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="sp-contact-whatsapp-link"
          >
            <MessageCircle size={19} />
            <span>Chat With Us On WhatsApp</span>
          </a>
        </motion.div>

        <motion.div
          className="sp-contact-form-panel"
          initial={{ opacity: 0, x: 44, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.26 }}
          transition={{ duration: 0.76, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-contact-form-head">
            <span>Request a Custom Quote</span>
            <h2 className="sp-section-heading">Send us your project details.</h2>
            <p>
              Fill out the form below with your layout, volume, or finishing
              requirements, and our team will get back to you promptly.
            </p>
          </div>

          <form
            className="sp-contact-form"
            onSubmit={onSubmit}
            onReset={handleFormReset}
          >
            <label className={getFieldClassName("fullName")}>
              <span>Full Name *</span>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                required
                onChange={handleFieldChange}
              />
            </label>

            <label className={getFieldClassName("email")}>
              <span>Email Address *</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                onChange={handleFieldChange}
              />
            </label>

            <label className={getFieldClassName("phone")}>
              <span>Phone Number</span>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                onChange={handleFieldChange}
              />
            </label>

            <label className={getFieldClassName("service")}>
              <span>Service Required</span>
              <select
                name="service"
                defaultValue="Offset Printing"
                onChange={handleFieldChange}
              >
                <option>Offset Printing</option>
                <option>Packaging & Boxes</option>
                <option>Books & Magazines</option>
                <option>Corporate Stationery</option>
                <option>Posters, Banners & Flyers</option>
                <option>Other</option>
              </select>
            </label>

            <label
              className={getFieldClassName(
                "message",
                "sp-contact-message-field"
              )}
            >
              <span>Project Details / Message *</span>
              <textarea
                name="message"
                placeholder="Tell us about your project, quantity, paper type, size, finishing or deadline..."
                required
                onChange={handleFieldChange}
              />
            </label>

            {contactStatus === "success" && (
              <p className="sp-contact-status success">
                Your inquiry has been sent successfully. Our team will contact
                you soon.
              </p>
            )}

            {contactStatus === "error" && (
              <p className="sp-contact-status error">
                Something went wrong. Please try again or contact us through
                WhatsApp.
              </p>
            )}

            <button
              type="submit"
              className={`sp-contact-submit-button${
                contactStatus === "loading" ? " is-loading" : ""
              }`}
              disabled={contactStatus === "loading"}
            >
              <span>
                {contactStatus === "loading" ? "Sending..." : "Send Inquiry"}
              </span>
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
