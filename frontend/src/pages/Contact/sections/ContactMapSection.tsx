import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const mapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.53178567137434!2d79.871671!3d6.9491766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae258f854d3df25%3A0xe4f0cde8e9167140!2s445%20Sirimavo%20Bandaranaike%20Mawatha%2C%20Colombo%2001400!5e0!3m2!1sen!2slk!4v1785997317016!5m2!1sen!2slk";

const mapOpenUrl = "https://maps.app.goo.gl/yKypEqwmrBJJGSCj6";

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
          
          <h2 className="sp-section-heading">Visit Sumathi Printers in Colombo 14.</h2>
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
              445 Sirimavo Bandaranaike Mawatha,
              <p>Colombo 01400.</p>
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
