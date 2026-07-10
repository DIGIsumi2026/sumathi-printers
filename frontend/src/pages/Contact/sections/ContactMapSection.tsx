import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const mapEmbedUrl =
  "https://www.google.com/maps?q=445%2F1%20Sirimavo%20Bandaranaike%20Mawatha%2C%20Colombo%2014%2C%20Sri%20Lanka&output=embed";

const mapOpenUrl = "https://maps.app.goo.gl/WnS6ukBa3SFakzY27";

export default function ContactMapSection() {
  return (
    <section className="sp-contact-map-section" data-watermark-section>
      <span className="sp-contact-watermark sp-contact-watermark-left" data-section-watermark>
        LOCATION
      </span>

      <span className="sp-contact-orb sp-contact-map-orb-one" />
      <span className="sp-contact-orb sp-contact-map-orb-two" />
      <span className="sp-contact-ring sp-contact-map-ring-one" />

      <div className="container sp-contact-map-container">
        <motion.div
          className="sp-contact-map-head"
          initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-contact-pill sp-contact-pill-light">
            <Sparkles size={15} />
            <span>Find Our Facility</span>
          </div>

          <h2 className="sp-section-heading">Visit Sumathi Printers in Colombo 14.</h2>

          <p>
            Use the map below to locate our office and production facility at
            Sirimavo Bandaranaike Mawatha.
          </p>
        </motion.div>

        <motion.div
          className="sp-contact-map-card"
          initial={{ opacity: 0, y: 48, scale: 0.96, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <iframe
            title="Sumathi Printers Location Map"
            src={mapEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="sp-contact-map-floating-card">
            <span>
              <MapPin size={18} />
            </span>

            <div>
              <strong>445/1, Sirimawo Bandaranayaka Mawatha</strong>
              <p>Colombo 14, Sri Lanka</p>
            </div>

            <a href={mapOpenUrl} target="_blank" rel="noreferrer">
              <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
