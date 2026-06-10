import { useRef, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";
import { imageAssets } from "../../../data/imageAssets";

export default function AboutIntroVideoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.72, 1],
    [1, 1, 0.84, 0.66]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.75, 1],
    [1, 1, 0.48, 0]
  );

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.42, 1],
    [0, -46, -180]
  );

  return (
    <section ref={sectionRef} className="sp-about-hero-video-section">
      <div className="sp-about-hero-sticky">
        <motion.div
          className="sp-about-hero-visual"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            y: heroY
          }}
        >
          <video
            className={`sp-about-hero-video ${
              hasVideoEnded ? "is-hidden" : ""
            }`}
            src={videoAssets.aboutHero.intro}
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={() => setHasVideoEnded(true)}
          />

          <div
            className={`sp-about-hero-thumbnail ${
              hasVideoEnded ? "is-visible" : ""
            }`}
          >
            <img
              src={imageAssets.about.thumbnail}
              alt="Sumathi Printers Sri Lankan staff working inside the printing facility"
              draggable={false}
            />

            <div className="sp-about-hero-thumb-overlay" />

            <span className="sp-about-hero-float sp-about-hero-float-one" />
            <span className="sp-about-hero-float sp-about-hero-float-two" />
            <span className="sp-about-hero-float sp-about-hero-float-three" />
            <span className="sp-about-hero-ring sp-about-hero-ring-one" />
            <span className="sp-about-hero-ring sp-about-hero-ring-two" />

            <motion.div
              className="sp-about-hero-content"
              initial={false}
              animate={
                hasVideoEnded
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 28, filter: "blur(12px)" }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sp-about-hero-badge">
                <Sparkles size={15} />
                <span>About Sumathi Printers</span>
              </div>

              <h1>Printing Excellence Powered By People And Precision</h1>

              <p>
                Discover our Sri Lankan team, modern printing technology and
                quality-focused production process behind every project we
                deliver.
              </p>

              <div className="sp-about-hero-scroll-hint">
                <ArrowDown size={17} />
                <span>Scroll to explore our story</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}