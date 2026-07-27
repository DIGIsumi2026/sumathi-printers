import { Play, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";
import { imageAssets } from "../../../data/imageAssets";
import { useMediaPlaybackPolicy } from "../../../hooks/useMediaPlaybackPolicy";

export default function ProjectsFacilitySection() {
  const { shouldPlayHeroVideo } = useMediaPlaybackPolicy();

  return (
    <section className="sp-projects-facility-section" data-watermark-section>
      <span className="sp-projects-facility-watermark" data-section-watermark>PRINTING ART</span>

      <span className="sp-projects-facility-orb sp-projects-facility-orb-one" />
      <span className="sp-projects-facility-orb sp-projects-facility-orb-two" />
      <span className="sp-projects-facility-ring sp-projects-facility-ring-one" />
      <span className="sp-projects-facility-ring sp-projects-facility-ring-two" />

      <div className="container sp-projects-facility-container">
        <motion.div
          className="sp-projects-facility-header"
          initial={{ opacity: 0, y: 34, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-projects-facility-badge">
            <Sparkles size={15} />
            <span>Inside The Facility</span>
          </div>

          <h2 className="sp-section-heading">The Art of Printing</h2>

          <p>
            Step inside our state-of-the-art facility. Witness the seamless
            integration of modern offset machinery and expert craftsmanship,
            working together to bring your projects to life with unparalleled
            accuracy.
          </p>
        </motion.div>

        <div className="sp-projects-video-grid">
          <motion.article
            className="sp-projects-video-card sp-projects-video-card-large"
            initial={{ opacity: 0, y: 46, scale: 0.96, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            {shouldPlayHeroVideo ? (
              <video
                src={videoAssets.projects.facility}
                muted
                playsInline
                autoPlay
                loop
                preload="metadata"
              />
            ) : (
              <img
                src={imageAssets.projectsPage.heroPoster}
                alt="Sumathi Printers facility walkthrough preview"
                loading="lazy"
                decoding="async"
              />
            )}

            <div className="sp-projects-video-overlay" />

            <div className="sp-projects-video-content">
              <span>
                <Play size={15} />
                Facility Walkthrough
              </span>

              <h3>Modern machinery, expert hands, premium print production.</h3>
            </div>
          </motion.article>

          <motion.article
            className="sp-projects-video-card"
            initial={{ opacity: 0, y: 46, scale: 0.96, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.78, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {shouldPlayHeroVideo ? (
              <video
                src={videoAssets.projects.process}
                muted
                playsInline
                autoPlay
                loop
                preload="metadata"
              />
            ) : (
              <img
                src={imageAssets.projectsPage.corporatePublications}
                alt="Sumathi Printers print process preview"
                loading="lazy"
                decoding="async"
              />
            )}

            <div className="sp-projects-video-overlay" />

            <div className="sp-projects-video-content">
              <span>
                <Play size={15} />
                Print Process
              </span>

              <h3>From press to finishing, every detail matters.</h3>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
