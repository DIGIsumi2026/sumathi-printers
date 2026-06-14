import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";

export default function ProjectsHeroSection() {
  const scrollToProjects = () => {
    const section = document.getElementById("project-categories");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section className="sp-projects-hero-section">
      <video
        className="sp-projects-hero-video"
        src={videoAssets.projects.hero}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      />

      <div className="sp-projects-hero-overlay" />
      <div className="sp-projects-hero-grid" />

      <span className="sp-projects-hero-watermark">OUR WORK</span>

      <span className="sp-projects-hero-orb sp-projects-hero-orb-one" />
      <span className="sp-projects-hero-orb sp-projects-hero-orb-two" />
      <span className="sp-projects-hero-ring sp-projects-hero-ring-one" />
      <span className="sp-projects-hero-ring sp-projects-hero-ring-two" />
      <span className="sp-projects-hero-shape sp-projects-hero-shape-one" />
      <span className="sp-projects-hero-shape sp-projects-hero-shape-two" />

      <div className="container sp-projects-hero-container">
        <motion.div
          className="sp-projects-hero-content"
          initial={{ opacity: 0, y: 46, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-projects-hero-badge">
            <Sparkles size={15} />
            <span>Portfolio Showcase</span>
          </div>

          <h1>Our Work</h1>

          <h2>Decades of Excellence in Print.</h2>

          <p>
            Explore our diverse portfolio of high-quality printing and packaging
            solutions. From large-scale government projects to premium corporate
            branding, we deliver precision, consistency, and craftsmanship that
            meets the highest international standards.
          </p>

          <div className="sp-projects-hero-actions">
            <button
              type="button"
              className="sp-projects-hero-button sp-projects-hero-button-primary"
              onClick={scrollToProjects}
            >
              <span>Explore Projects</span>
              <ArrowDown size={18} />
            </button>

            <Link
              to="/contact"
              className="sp-projects-hero-button sp-projects-hero-button-secondary"
            >
              <span>Request A Quote</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}