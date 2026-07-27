import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { videoAssets } from "../../../data/videoAssets";
import { imageAssets } from "../../../data/imageAssets";
import { useGsapHeroParallax } from "../../../lib/useGsapAnimations";
import {
  useManagedHeroVideo,
  useMediaPlaybackPolicy
} from "../../../hooks/useMediaPlaybackPolicy";

export default function GalleryHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { shouldPlayHeroVideo } = useMediaPlaybackPolicy();

  useGsapHeroParallax(sectionRef);
  useManagedHeroVideo(videoRef, sectionRef, shouldPlayHeroVideo);

  return (
    <section
      ref={sectionRef}
      className="sp-gallery-hero-section"
      data-gsap-hero
      data-watermark-section
    >
      <img
        className="sp-gallery-hero-poster"
        src={imageAssets.gallery.heroPoster}
        alt="Sumathi Printers gallery of finished printing projects"
        draggable={false}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      {shouldPlayHeroVideo && (
        <video
          ref={videoRef}
          className="sp-gallery-hero-video"
          src={videoAssets.gallery.hero}
          muted
          playsInline
          loop
          preload="metadata"
          poster={imageAssets.gallery.heroPoster}
        />
      )}

      <div className="sp-gallery-hero-overlay" />
      <div className="sp-gallery-hero-grid" />

      <span className="sp-gallery-watermark sp-gallery-watermark-left" data-section-watermark>
        GALLERY
      </span>

      <div className="container sp-gallery-hero-container">
        <div className="sp-gallery-hero-content" data-gsap-hero-content>
          <div className="sp-gallery-pill">
            <Sparkles size={15} />
            <span>Visual Portfolio</span>
          </div>

          <h1 className="sp-section-heading">The Printing Gallery</h1>

          <p>
            Four decades of precision printing, finishing, and packaging
            excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
