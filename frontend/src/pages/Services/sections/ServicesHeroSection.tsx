import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MessageCircle, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";
import { imageAssets } from "../../../data/imageAssets";

export default function ServicesHeroSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  const scrollToServices = () => {
    const section = document.getElementById("all-services");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section className="sp-services-hero-section">
      <div className="sp-services-hero-media">
        <video
          ref={videoRef}
          className={`sp-services-hero-video ${videoEnded ? "is-hidden" : ""}`}
          src={videoAssets.services.hero}
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={() => setVideoEnded(true)}
        />

        <img
          src={imageAssets.services.heroThumbnail}
          alt="Sumathi Printers professional printing services"
          className={`sp-services-hero-thumbnail ${
            videoEnded ? "is-visible" : ""
          }`}
          draggable={false}
        />
      </div>

      <div className="sp-services-hero-overlay" />
      <div className="sp-services-hero-grid" />

      <span className="sp-services-hero-watermark">SERVICES</span>

      <span className="sp-services-float sp-services-float-one" />
      <span className="sp-services-float sp-services-float-two" />
      <span className="sp-services-float sp-services-float-three" />
      <span className="sp-services-ring sp-services-ring-one" />
      <span className="sp-services-ring sp-services-ring-two" />

      <div className="container sp-services-hero-container">
        <motion.div
          className="sp-services-hero-content"
          initial={{ opacity: 0, y: 42, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-services-hero-badge">
            {videoEnded ? <Sparkles size={15} /> : <Play size={15} />}
            <span>
              {videoEnded
                ? "Explore Our Printing Expertise"
                : "Quality In Every Detail"}
            </span>
          </div>

          <h1>
            Premium Printing Services Crafted With Precision
          </h1>

          <p>
            From offset printing and binding to packaging, labels, brochures,
            books and professional finishing, we deliver every project with
            sharp quality, reliable production and attention to detail.
          </p>

          <div
            className={`sp-services-hero-actions ${
              videoEnded ? "is-visible" : ""
            }`}
          >
            <button
              type="button"
              className="sp-services-hero-button sp-services-hero-button-primary"
              onClick={scrollToServices}
            >
              <span>See All Services</span>
              <ArrowDown size={18} />
            </button>

            <Link
              to="/contact"
              className="sp-services-hero-button sp-services-hero-button-secondary"
            >
              <span>Get A Quote</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          className={`sp-services-thumbnail-popup ${
            videoEnded ? "is-visible" : ""
          }`}
          initial={false}
          animate={
            videoEnded
              ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, y: 34, scale: 0.92, filter: "blur(12px)" }
          }
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>
            <MessageCircle size={15} />
            Ready to start?
          </span>

          <strong>Let’s discuss your next print project.</strong>

          <Link to="/contact">
            Contact Us
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}