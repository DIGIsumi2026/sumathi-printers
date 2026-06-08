import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import type { CompanyData } from "../../../types/site";
import { imageAssets } from "../../../data/imageAssets";
import { AnimatedButton } from "../../../components/common/Buttons";

type HeroSectionProps = {
  company: CompanyData;
};

const SLIDE_DURATION = 5200;

const heroSlides = [
  {
    id: "offset-printing",
    word: "Quality",
    eyebrow: "Offset Printing",
    image: imageAssets.hero.offsetPrinting,
    color: "#38c7ff",
    description:
      "High-quality offset printing with precision colour control, sharp finishing, and reliable production for business and institutional requirements."
  },
  {
    id: "graphic-designing",
    word: "Creative",
    eyebrow: "Graphic Designing",
    image: imageAssets.hero.graphicDesigning,
    color: "#e72a9a",
    description:
      "Creative print-ready designs for brochures, posters, flyers, stationery, packaging concepts, and complete brand communication."
  },
  {
    id: "packaging-box-printing",
    word: "Premium",
    eyebrow: "Packaging Box Printing",
    image: imageAssets.hero.packagingBoxPrinting,
    color: "#f6a13d",
    description:
      "Premium custom packaging, folding cartons, product boxes, labels, and brand-focused packaging solutions for commercial products."
  },
  {
    id: "books-magazines-brochures",
    word: "Reliable",
    eyebrow: "Books, Magazines & Brochures",
    image: imageAssets.hero.booksMagazinesBrochures,
    color: "#7a4dff",
    description:
      "Professional books, magazines, catalogs, brochures, and bound publications with clean pages, strong covers, and dependable finishing."
  }
];

export default function HeroSection({ company }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
  const timer = window.setTimeout(() => {
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  }, SLIDE_DURATION);

  return () => {
    window.clearTimeout(timer);
  };
}, [activeIndex]);


  const heroStyle = useMemo(
    () =>
      ({
        "--hero-accent": activeSlide.color,
        "--hero-duration": `${SLIDE_DURATION}ms`
      }) as CSSProperties,
    [activeSlide.color]
  );

  return (
    <section id="home" className="sp-hero-section" style={heroStyle}>
      <div className="sp-hero-background">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={`${slide.eyebrow} service`}
            className={`sp-hero-bg-image ${
              index === activeIndex ? "is-active" : ""
            }`}
          />
        ))}
      </div>

      <div className="sp-hero-overlay" />
      <div className="sp-hero-grid-pattern" />

      <span className="sp-hero-shape sp-hero-shape-one" />
      <span className="sp-hero-shape sp-hero-shape-two" />
      <span className="sp-hero-shape sp-hero-shape-three" />
      <span className="sp-hero-watermark">SUMATHI PRINTERS</span>

      <div className="container sp-hero-container">
        <div className="sp-hero-content">
          <div className="sp-hero-eyebrow">
            <Sparkles size={15} />
            <span>{company.tagline || "Premium Printing & Publishing"}</span>
          </div>

          <h1 className="sp-hero-title">
            <span>Printing Solutions</span>
            <span key={activeSlide.word} className="sp-hero-changing-word">
              {activeSlide.word}
            </span>
            <span>For Your Brand</span>
          </h1>

          <p key={activeSlide.id} className="sp-hero-description">
            {activeSlide.description}
          </p>

          <div className="sp-hero-actions">
            <AnimatedButton href="#contact" variant="primary">
              Request Quote
            </AnimatedButton>

            <AnimatedButton href="#contact" variant="secondary">
              Get In Touch
            </AnimatedButton>
          </div>

          <ul className="sp-hero-points">
            <li>
              <CheckCircle2 size={16} />
              <span>Established roots since 1984</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Modern printing equipment</span>
            </li>
            <li>
              <CheckCircle2 size={16} />
              <span>Fast and reliable delivery</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="sp-hero-progress-wrap">
        <div className="sp-hero-progress-bar" role="tablist">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              className={`sp-hero-progress-segment ${
                activeIndex === index ? "is-active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <span
                key={
                  activeIndex === index
                    ? `${slide.id}-${activeIndex}`
                    : slide.id
                }
                className="sp-hero-progress-fill"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}