import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { videoAssets } from "../../../data/videoAssets";

const CAPTION_REVEAL_AT_SECONDS = 1.2;
const LOGO_REPLAY_DELAY = 420;

export default function AboutVideoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const replayTimerRef = useRef<number | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [captionVisible, setCaptionVisible] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [logoHovering, setLogoHovering] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setCaptionVisible(false);
          setVideoEnded(false);
          setLogoHovering(false);

          video.currentTime = 0;

          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.catch(() => {});
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

      if (replayTimerRef.current) {
        window.clearTimeout(replayTimerRef.current);
      }
    };
  }, [hasStarted]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || captionVisible) return;

    if (video.currentTime >= CAPTION_REVEAL_AT_SECONDS) {
      setCaptionVisible(true);
    }
  };

  const handleVideoEnded = () => {
    setCaptionVisible(true);
    setVideoEnded(true);
  };

  const replayVideoFromLogo = () => {
    const video = videoRef.current;

    if (!video || !videoEnded) return;

    setLogoHovering(true);

    if (replayTimerRef.current) {
      window.clearTimeout(replayTimerRef.current);
    }

    replayTimerRef.current = window.setTimeout(() => {
      setLogoHovering(false);
      setCaptionVisible(false);
      setVideoEnded(false);

      video.currentTime = 0;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }, LOGO_REPLAY_DELAY);
  };

  return (
    <section ref={sectionRef} id="about" className="sp-about-video-section">
      <div className="container sp-about-video-container">
        <div
          className={`sp-about-video-card ${
            captionVisible ? "is-caption-visible" : ""
          } ${videoEnded ? "is-video-ended" : ""}`}
        >
          <video
            ref={videoRef}
            className="sp-about-video"
            src={videoAssets.about.intro}
            poster={videoAssets.about.thumbnail}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
          />

          <img
            className={`sp-about-video-thumbnail ${
              videoEnded ? "is-visible" : ""
            }`}
            src={videoAssets.about.thumbnail}
            alt=""
            aria-hidden="true"
            draggable={false}
          />

          <div className="sp-about-video-cursor-zone" data-cursor-label="Play" />
          <div className="sp-about-video-base-overlay" />

          <div
            className={`sp-about-video-right-fade ${
              captionVisible ? "is-visible" : ""
            }`}
          />

          <button
            type="button"
            className={`sp-about-logo-hotspot ${
              videoEnded ? "is-active" : ""
            } ${logoHovering ? "is-hovering" : ""}`}
            aria-label="Replay about video"
            data-cursor-label="Replay"
            onMouseEnter={replayVideoFromLogo}
            onFocus={replayVideoFromLogo}
          />

          <motion.div
            className={`sp-about-video-caption ${
              captionVisible ? "is-visible" : ""
            }`}
            initial={false}
            animate={
              captionVisible
                ? {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)"
                  }
                : {
                    opacity: 0,
                    x: 44,
                    filter: "blur(14px)"
                  }
            }
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="sp-about-video-badge">
              <Sparkles size={15} />
              <span>About Sumathi Printers</span>
            </div>

            <h2 className="sp-about-video-title">
              SUMATHI PRINTERS <span>(PVT) LTD</span>
            </h2>

            <p className="sp-about-video-text">
              Sumathi Publishers, a partnership established in 1984, was the
              forerunner to Sumathi Book Printing (Private) Limited which was
              incorporated in 1991 and re-named as Sumathi Printers (Private)
              Limited in 2011, a subsidiary of Sumathi Global Consolidates
              (Pvt) Ltd. The company has been in the forefront of the printing
              and publishing industry in Sri Lanka for several decades,
              specializing in publishing tabloids, magazines, high-speed soft
              cover book printing and finishing, with options such as UV
              varnish, foil and embossed soft covers.
            </p>

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