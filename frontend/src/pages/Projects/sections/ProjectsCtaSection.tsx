import { useRef } from "react";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";
import { useGsapCtaReveal } from "../../../lib/useGsapAnimations";

const whatsappMessage = encodeURIComponent(
  "Hello Sumathi Printers, I would like to start a printing project."
);

const whatsappLink = `https://wa.me/9477426900?text=${whatsappMessage}`;

export default function ProjectsCtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapCtaReveal(sectionRef);

  return (
    <section ref={sectionRef} className="sp-projects-cta-section" data-watermark-section>
      <span className="sp-projects-cta-watermark" data-section-watermark>START PROJECT</span>

      <span className="sp-projects-cta-orb sp-projects-cta-orb-one" />
      <span className="sp-projects-cta-orb sp-projects-cta-orb-two" />
      <span className="sp-projects-cta-ring sp-projects-cta-ring-one" />
      <span className="sp-projects-cta-ring sp-projects-cta-ring-two" />

      <div className="container sp-projects-cta-container">
        <motion.div
          className="sp-projects-cta-card"
          data-gsap-cta
          initial={{ opacity: 0, y: 54, scale: 0.96, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.26 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={imageAssets.projectsPage.ctaBanner}
            alt="Ready to start your next printing project"
            className="sp-projects-cta-image"
            data-gsap-cta-bg
            draggable={false}
            loading="lazy"
            decoding="async"
          />

          <div className="sp-projects-cta-overlay" />
          <div className="sp-projects-cta-grid" />

          <div className="sp-projects-cta-content" data-gsap-cta-content>

            <h2 className="sp-section-heading">Ready to start your next printing project?</h2>

            <p>
              Partner with us for reliable, high-quality, and timely printing
              solutions crafted with precision, consistency and professional
              finishing.
            </p>

            <div className="sp-projects-cta-actions">
              <Link
                to="/contact"
                className="sp-projects-cta-button sp-projects-cta-button-primary"
              >
                <span>Request A Quote</span>
                <ArrowUpRight size={19} />
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="sp-projects-cta-button sp-projects-cta-button-secondary"
              >
                <MessageCircle size={19} />
                <span>Chat With Us</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
