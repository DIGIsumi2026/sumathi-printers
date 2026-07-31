import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";
import { imageAssets } from "../../../data/imageAssets";
import { useGsapHeroParallax } from "../../../lib/useGsapAnimations";
import {
  useManagedHeroVideo,
  useMediaPlaybackPolicy
} from "../../../hooks/useMediaPlaybackPolicy";

export default function ProjectsHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { shouldPlayHeroVideo, shouldAnimateHeavy } = useMediaPlaybackPolicy();

  useGsapHeroParallax(sectionRef);
  useManagedHeroVideo(videoRef, sectionRef, shouldPlayHeroVideo);

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
    <section
      ref={sectionRef}
      className="sp-projects-hero-section"
      data-gsap-hero
      data-watermark-section
    >
      <img
        className="sp-projects-hero-poster"
        src={imageAssets.projectsPage.heroPoster}
        alt="Sumathi Printers finished print work portfolio"
        draggable={false}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {shouldPlayHeroVideo && (
        <video
          ref={videoRef}
          className="sp-projects-hero-video"
          src={videoAssets.projects.hero}
          muted
          playsInline
          loop
          preload="metadata"
          poster={imageAssets.projectsPage.heroPoster}
        />
      )}

      <div className="sp-projects-hero-overlay" />
      <div className="sp-projects-hero-grid" />

      <span className="sp-projects-hero-watermark" data-section-watermark>OUR WORK</span>

      <div className="container sp-projects-hero-container">
        <motion.div
          className="sp-projects-hero-content"
          data-gsap-hero-content
          initial={
            shouldAnimateHeavy
              ? { opacity: 0, y: 46, filter: "blur(14px)" }
              : false
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: shouldAnimateHeavy ? 0.82 : 0.18,
            ease: [0.22, 1, 0.36, 1]
          }}
        >

          <h1 className="sp-section-heading">Our Work</h1>

          <h2 className="sp-section-heading">Decades of Excellence in Print.</h2>

          <p>
            Explore our diverse portfolio of high quality printing and packaging
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
