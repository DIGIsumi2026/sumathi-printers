import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";

export default function AboutVideoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setVideoFinished(false);

          video.currentTime = 0;

          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay can be blocked in some browsers.
              // The video is muted, so most browsers allow it.
            });
          }
        }
      },
      {
        threshold: 0.45
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  const handleVideoEnded = () => {
    setVideoFinished(true);
  };

  const replayVideoFromLogo = () => {
    const video = videoRef.current;

    if (!video || !videoFinished) return;

    setVideoFinished(false);
    video.currentTime = 0;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  return (
    <section ref={sectionRef} id="about-video" className="sp-about-video-section">
      <div className="container sp-about-video-container">
        <div className={`sp-about-video-card ${videoFinished ? "is-video-ended" : ""}`}>
          <video
            ref={videoRef}
            className="sp-about-video"
            src={videoAssets.about.intro}
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
          />

          <div className="sp-about-video-base-overlay" />
          <div className={`sp-about-video-right-fade ${videoFinished ? "is-visible" : ""}`} />

          <button
            type="button"
            className={`sp-about-logo-hotspot ${videoFinished ? "is-active" : ""}`}
            aria-label="Replay about video"
            onMouseEnter={replayVideoFromLogo}
            onFocus={replayVideoFromLogo}
          />

          <motion.div
            className={`sp-about-video-caption ${videoFinished ? "is-visible" : ""}`}
            initial={false}
            animate={
              videoFinished
                ? {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)"
                  }
                : {
                    opacity: 0,
                    x: 46,
                    filter: "blur(14px)"
                  }
            }
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="sp-about-video-badge">
              <Sparkles size={15} />
              <span>About Sumathi Printers</span>
            </div>

            <h2 className="sp-about-video-title">
              Printing Excellence Built On Quality, Trust And Innovation
            </h2>

            <p className="sp-about-video-text">
              Sumathi Printers has been part of Sri Lanka&apos;s printing and
              publishing industry for decades, delivering professional print
              solutions with modern machinery, skilled people, and a strong
              commitment to quality.
            </p>

            <div className="sp-about-video-points">
              <span>
                <CheckCircle2 size={16} />
                Established roots since 1984
              </span>

              <span>
                <CheckCircle2 size={16} />
                Modern printing and finishing facilities
              </span>

              <span>
                <CheckCircle2 size={16} />
                Reliable service for businesses and institutions
              </span>
            </div>

            <a href="#about-details" className="sp-about-video-readmore">
              <span>Read More</span>
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}