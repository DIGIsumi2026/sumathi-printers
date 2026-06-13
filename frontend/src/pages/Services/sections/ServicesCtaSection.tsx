import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";

const whatsappMessage = encodeURIComponent(
  "Hello Sumathi Printers, I would like to get a quote for a printing project."
);

const whatsappLink = `https://wa.me/9477426900?text=${whatsappMessage}`;

export default function ServicesCtaSection() {
  return (
    <section className="sp-services-cta-section">
      <span className="sp-services-cta-watermark">GET A QUOTE</span>

      <span className="sp-services-cta-orb sp-services-cta-orb-one" />
      <span className="sp-services-cta-orb sp-services-cta-orb-two" />
      <span className="sp-services-cta-ring sp-services-cta-ring-one" />
      <span className="sp-services-cta-ring sp-services-cta-ring-two" />
      <span className="sp-services-cta-shape sp-services-cta-shape-one" />
      <span className="sp-services-cta-shape sp-services-cta-shape-two" />

      <div className="container sp-services-cta-container">
        <motion.div
          className="sp-services-cta-card"
          initial={{ opacity: 0, y: 56, scale: 0.96, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={imageAssets.services.ctaBanner}
            alt="Premium print finishing and printing services"
            className="sp-services-cta-image"
            draggable={false}
          />

          <div className="sp-services-cta-overlay" />
          <div className="sp-services-cta-grid" />
          <div className="sp-services-cta-bottom-glow" />

          <span className="sp-services-cta-float sp-services-cta-float-one" />
          <span className="sp-services-cta-float sp-services-cta-float-two" />
          <span className="sp-services-cta-float sp-services-cta-float-three" />

          <motion.div
            className="sp-services-cta-content"
            initial={{ opacity: 0, x: -46, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.78, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sp-services-cta-badge">
              <Sparkles size={15} />
              <span>Ready To Start?</span>
            </div>

            <h2>Let’s Finish Your Print Project With Premium Quality</h2>

            <p>
              From printing and packaging to binding, trimming, lamination and
              final finishing, our team is ready to deliver clean, durable and
              professional print results for your next project.
            </p>

            <div className="sp-services-cta-actions">
              <Link
                to="/contact"
                className="sp-services-cta-button sp-services-cta-button-primary"
              >
                <span>Get A Quote</span>
                <ArrowUpRight size={19} />
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="sp-services-cta-button sp-services-cta-button-secondary"
              >
                <MessageCircle size={19} />
                <span>Chat With Us</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="sp-services-cta-mini-card"
            initial={{ opacity: 0, y: 32, scale: 0.9, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.72, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Contact</span>
            <strong>077 42 6900</strong>
            <small>Quick support for your print requirements</small>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}