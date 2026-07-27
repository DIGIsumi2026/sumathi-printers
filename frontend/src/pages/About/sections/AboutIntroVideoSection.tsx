import { useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";
import { imageAssets } from "../../../data/imageAssets";
import { useGsapHeroParallax } from "../../../lib/useGsapAnimations";
import {
  useManagedHeroVideo,
  useMediaPlaybackPolicy
} from "../../../hooks/useMediaPlaybackPolicy";

type AboutHeroVisualProps = {
  sectionRef: RefObject<HTMLElement | null>;
  children: ReactNode;
};

function AnimatedAboutHeroVisual({ sectionRef, children }: AboutHeroVisualProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const heroScaleRaw = useTransform(
    scrollYProgress,
    [0, 0.18, 0.68, 1],
    [1.08, 1.02, 0.9, 0.78]
  );

  const heroOpacityRaw = useTransform(
    scrollYProgress,
    [0, 0.34, 0.78, 1],
    [1, 1, 0.72, 0.36]
  );

  const heroYRaw = useTransform(
    scrollYProgress,
    [0, 0.44, 1],
    [0, -36, -128]
  );

  const heroScale = useSpring(heroScaleRaw, {
    stiffness: 92,
    damping: 24,
    mass: 0.35
  });

  const heroOpacity = useSpring(heroOpacityRaw, {
    stiffness: 110,
    damping: 26,
    mass: 0.35
  });

  const heroY = useSpring(heroYRaw, {
    stiffness: 88,
    damping: 24,
    mass: 0.35
  });

  return (
    <motion.div
      className="sp-about-hero-visual"
      style={{
        scale: heroScale,
        opacity: heroOpacity,
        y: heroY
      }}
    >
      {children}
    </motion.div>
  );
}

function StaticAboutHeroVisual({ children }: Pick<AboutHeroVisualProps, "children">) {
  return <div className="sp-about-hero-visual">{children}</div>;
}

export default function AboutIntroVideoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  const { shouldPlayHeroVideo, shouldAnimateHeavy } = useMediaPlaybackPolicy();
  const contentVisible = !shouldPlayHeroVideo || hasVideoEnded;

  useGsapHeroParallax(sectionRef);
  useManagedHeroVideo(
    videoRef,
    sectionRef,
    shouldPlayHeroVideo && !hasVideoEnded
  );

  return (
    <section
      ref={sectionRef}
      className="sp-about-hero-video-section"
      data-gsap-hero
    >
      <div className="sp-about-hero-sticky">
        {shouldAnimateHeavy ? (
          <AnimatedAboutHeroVisual sectionRef={sectionRef}>
            {shouldPlayHeroVideo && (
              <video
                ref={videoRef}
                className={`sp-about-hero-video ${
                  hasVideoEnded ? "is-hidden" : ""
                }`}
                src={videoAssets.aboutHero.intro}
                muted
                playsInline
                preload="metadata"
                poster={imageAssets.about.thumbnail}
                onEnded={() => setHasVideoEnded(true)}
              />
            )}

            <div
              className={`sp-about-hero-thumbnail ${
                contentVisible ? "is-visible" : ""
              }`}
            >
              <img
                src={imageAssets.about.thumbnail}
                alt="Sumathi Printers Sri Lankan staff working inside the printing facility"
                draggable={false}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />

              <div className="sp-about-hero-thumb-overlay" />

              <motion.div
                className="sp-about-hero-content"
                data-gsap-hero-content
                initial={false}
                animate={
                  contentVisible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 28, filter: "blur(12px)" }
                }
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >

                <h1 className="sp-section-heading">Printing Excellence Powered By People And Precision</h1>

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
          </AnimatedAboutHeroVisual>
        ) : (
          <StaticAboutHeroVisual>
          {shouldPlayHeroVideo && (
            <video
              ref={videoRef}
              className={`sp-about-hero-video ${
                hasVideoEnded ? "is-hidden" : ""
              }`}
              src={videoAssets.aboutHero.intro}
              muted
              playsInline
              preload="metadata"
              poster={imageAssets.about.thumbnail}
              onEnded={() => setHasVideoEnded(true)}
            />
          )}

          <div
            className={`sp-about-hero-thumbnail ${
              contentVisible ? "is-visible" : ""
            }`}
          >
            <img
              src={imageAssets.about.thumbnail}
              alt="Sumathi Printers Sri Lankan staff working inside the printing facility"
              draggable={false}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />

            <div className="sp-about-hero-thumb-overlay" />

            <motion.div
              className="sp-about-hero-content"
              data-gsap-hero-content
              initial={false}
              animate={
                contentVisible
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 28, filter: "blur(12px)" }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="sp-section-heading">Printing Excellence Powered By People And Precision</h1>

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
          </StaticAboutHeroVisual>
        )}
      </div>
    </section>
  );
}
