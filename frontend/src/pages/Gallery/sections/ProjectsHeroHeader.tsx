import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";

export default function ProjectsHeroHeader() {
  const scrollToGallery = () => {
    const section = document.getElementById("projects-gallery-showcase");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section className="sp-project-hero-section">
      <video
        className="sp-project-hero-video"
        src={videoAssets.gallery.hero}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      />

      <div className="sp-project-hero-overlay" />
      <div className="sp-project-hero-grid" />

      <span className="sp-project-watermark sp-project-watermark-left">
        OUR WORK
      </span>

      <span className="sp-project-float-orb sp-project-hero-orb-one" />
      <span className="sp-project-float-orb sp-project-hero-orb-two" />
      <span className="sp-project-float-ring sp-project-hero-ring-one" />
      <span className="sp-project-float-shape sp-project-hero-shape-one" />

      <div className="container sp-project-hero-container">
        <motion.div
          className="sp-project-hero-content"
          initial={{ opacity: 0, y: 46, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-project-pill">
            <Sparkles size={15} />
            <span>Projects Showcase</span>
          </div>

          <h1>Craftsmanship in Print, Proven at Scale</h1>

          <p>
            Exploring decades of high-precision printing and custom packaging
            solutions for Sri Lanka’s leading institutions.
          </p>

          <div className="sp-project-hero-actions">
            <button
              type="button"
              className="sp-project-button sp-project-button-primary"
              onClick={scrollToGallery}
            >
              <span>Explore Portfolio</span>
              <ArrowDown size={18} />
            </button>

            <Link
              to="/contact"
              className="sp-project-button sp-project-button-secondary"
            >
              <span>Request Quote</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}