import { useRef } from "react";
import { ArrowUpRight, BriefcaseBusiness, Layers3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";
import { useGsapCtaReveal } from "../../../lib/useGsapAnimations";

export default function AboutServicesProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapCtaReveal(sectionRef);

  return (
    <section ref={sectionRef} className="sp-about-bridge-section">
      <span className="sp-about-bridge-watermark">EXPLORE</span>

      <span className="sp-about-bridge-orb sp-about-bridge-orb-one" />
      <span className="sp-about-bridge-orb sp-about-bridge-orb-two" />
      <span className="sp-about-bridge-ring sp-about-bridge-ring-one" />
      <span className="sp-about-bridge-shape sp-about-bridge-shape-one" />

      <div className="container sp-about-bridge-container">
        <motion.div
          className="sp-about-bridge-card"
          data-gsap-cta
          initial={{ opacity: 0, y: 48, scale: 0.96, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={imageAssets.about.servicesProjectsBanner}
            alt="Sumathi Printers services and projects"
            className="sp-about-bridge-image"
            data-gsap-cta-bg
            draggable={false}
            loading="lazy"
            decoding="async"
          />

          <div className="sp-about-bridge-overlay" />
          <div className="sp-about-bridge-grid" />

          <div className="sp-about-bridge-content" data-gsap-cta-content>
            <div className="sp-about-bridge-pill">
              <Sparkles size={15} />
              <span>Explore Our Work</span>
            </div>

            <h2>Discover what we create, finish, and deliver.</h2>

            <p>
              From premium printing services to completed project showcases,
              explore how Sumathi Printers transforms ideas into professional,
              high-quality printed products.
            </p>

            <div className="sp-about-bridge-actions">
              <Link
                to="/services#all-services"
                className="sp-about-bridge-button sp-about-bridge-button-primary"
              >
                <span>
                  <Layers3 size={18} />
                </span>
                Our Services
                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/projects"
                className="sp-about-bridge-button sp-about-bridge-button-secondary"
              >
                <span>
                  <BriefcaseBusiness size={18} />
                </span>
                Our Projects
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
