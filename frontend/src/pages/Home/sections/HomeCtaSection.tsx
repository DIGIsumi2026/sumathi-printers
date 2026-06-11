import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";

export default function HomeCtaSection() {
  return (
    <section className="sp-home-cta-section">
      <span className="sp-home-cta-bg-shape sp-home-cta-bg-shape-one" />
      <span className="sp-home-cta-bg-shape sp-home-cta-bg-shape-two" />
      <span className="sp-home-cta-bg-ring sp-home-cta-bg-ring-one" />
      <span className="sp-home-cta-bg-ring sp-home-cta-bg-ring-two" />

      <div className="container sp-home-cta-container">
        <motion.div
          className="sp-home-cta-card"
          initial={{ opacity: 0, y: 48, scale: 0.96, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={imageAssets.cta.bindingScene}
            alt="Professional book binding and print finishing at Sumathi Printers"
            className="sp-home-cta-image"
            draggable={false}
          />

          <div className="sp-home-cta-overlay" />
          <div className="sp-home-cta-grid-pattern" />

          <span className="sp-home-cta-float sp-home-cta-float-one" />
          <span className="sp-home-cta-float sp-home-cta-float-two" />
          <span className="sp-home-cta-float sp-home-cta-float-three" />
          <span className="sp-home-cta-ring sp-home-cta-ring-one" />
          <span className="sp-home-cta-ring sp-home-cta-ring-two" />

          <motion.div
            className="sp-home-cta-content"
            initial={{ opacity: 0, x: -42, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.38 }}
            transition={{ duration: 0.78, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sp-home-cta-badge">
              <Sparkles size={15} />
              <span>Let’s Print Something Exceptional</span>
            </div>

            <h2>Ready To Bring Your Print Project To Life?</h2>

            <p>
              From books and brochures to packaging, leaflets, certificates and
              custom print finishing, our team is ready to deliver sharp quality,
              reliable service and professional results.
            </p>

            <div className="sp-home-cta-actions">
              <a
                href="#contact"
                className="sp-home-cta-button sp-home-cta-button-primary"
                data-cursor-label="Quote"
              >
                <span>Get A Quote</span>
                <ArrowUpRight size={19} />
              </a>

              <a
                href="https://wa.me/94700000000"
                target="_blank"
                rel="noreferrer"
                className="sp-home-cta-button sp-home-cta-button-secondary"
                data-cursor-label="WhatsApp"
              >
                <MessageCircle size={19} />
                <span>Chat With Us</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="sp-home-cta-mini-card"
            initial={{ opacity: 0, y: 34, scale: 0.9, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.36 }}
            transition={{ duration: 0.72, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Since</span>
            <strong>1984</strong>
            <small>Trusted printing excellence</small>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}