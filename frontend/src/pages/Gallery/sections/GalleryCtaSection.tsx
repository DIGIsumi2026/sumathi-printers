import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { imageAssets } from "../../../data/imageAssets";
import { useGsapCtaReveal } from "../../../lib/useGsapAnimations";

export default function GalleryCtaSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapCtaReveal(sectionRef);

  return (
    <section ref={sectionRef} className="sp-gallery-cta-section" data-watermark-section>
      <span className="sp-gallery-watermark sp-gallery-watermark-right" data-section-watermark>
        INSPIRED
      </span>

      <span className="sp-gallery-float-orb sp-gallery-cta-orb-one" />
      <span className="sp-gallery-float-orb sp-gallery-cta-orb-two" />
      <span className="sp-gallery-float-ring sp-gallery-cta-ring-one" />

      <div className="container sp-gallery-cta-container">
        <div className="sp-gallery-cta-card" data-gsap-cta>
          <img
            src={imageAssets.gallery.finalCta}
            alt="Inspired by our work"
            data-gsap-cta-bg
            draggable={false}
            loading="lazy"
            decoding="async"
          />

          <div className="sp-gallery-cta-overlay" />

          <div className="sp-gallery-cta-content" data-gsap-cta-content>
            <div className="sp-gallery-pill">
              <Sparkles size={15} />
              <span>Start Your Print Project</span>
            </div>

            <h2 className="sp-section-heading">Inspired by our work? Let’s print yours.</h2>

            <p>
              Share your requirements, and our team will provide a customized
              printing solution.
            </p>

            <Link to="/contact" className="sp-gallery-cta-button">
              <span>Request a Custom Quote</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
