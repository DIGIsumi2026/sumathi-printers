import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";
import FloatingPrintScene from "../../../components/three/FloatingPrintScene";
import { useGsapHeroParallax } from "../../../lib/useGsapAnimations";

export default function ContactHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapHeroParallax(sectionRef);

  const scrollToForm = () => {
    const section = document.getElementById("contact-main-block");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="sp-contact-hero-section"
      data-gsap-hero
      data-watermark-section
    >
      <img
        src={imageAssets.contact.heroBanner}
        alt="Sumathi Printers contact reception"
        className="sp-contact-hero-image"
        draggable={false}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      <div className="sp-contact-hero-overlay" />
      <div className="sp-contact-hero-grid" />
      <FloatingPrintScene variant="contact" density="hero" />

      <span className="sp-contact-watermark sp-contact-watermark-left" data-section-watermark>
        CONTACT
      </span>

      <span className="sp-contact-orb sp-contact-hero-orb-one" />
      <span className="sp-contact-orb sp-contact-hero-orb-two" />
      <span className="sp-contact-ring sp-contact-hero-ring-one" />
      <span className="sp-contact-shape sp-contact-hero-shape-one" />

      <div className="container sp-contact-hero-container">
        <motion.div
          className="sp-contact-hero-content"
          data-gsap-hero-content
          initial={{ opacity: 0, y: 44, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-contact-pill">
            <Sparkles size={15} />
            <span>Contact Sumathi Printers</span>
          </div>

          <h1>Get in Touch</h1>

          <p>
            Have a project in mind? Let’s bring your printing and packaging
            ideas to life with precision and quality.
          </p>

          <button
            type="button"
            className="sp-contact-hero-button"
            onClick={scrollToForm}
          >
            <span>Send Inquiry</span>
            <ArrowDown size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
