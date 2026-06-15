import { Sparkles } from "lucide-react";
import { videoAssets } from "../../../data/videoAssets";

export default function GalleryHeroSection() {
  return (
    <section className="sp-gallery-hero-section">
      <video
        className="sp-gallery-hero-video"
        src={videoAssets.gallery.hero}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      />

      <div className="sp-gallery-hero-overlay" />
      <div className="sp-gallery-hero-grid" />

      <span className="sp-gallery-watermark sp-gallery-watermark-left">
        GALLERY
      </span>

      <span className="sp-gallery-float-orb sp-gallery-hero-orb-one" />
      <span className="sp-gallery-float-orb sp-gallery-hero-orb-two" />
      <span className="sp-gallery-float-ring sp-gallery-hero-ring-one" />

      <div className="container sp-gallery-hero-container">
        <div className="sp-gallery-hero-content">
          <div className="sp-gallery-pill">
            <Sparkles size={15} />
            <span>Visual Portfolio</span>
          </div>

          <h1>The Printing Gallery</h1>

          <p>
            Four decades of precision printing, finishing, and packaging
            excellence.
          </p>
        </div>
      </div>
    </section>
  );
}