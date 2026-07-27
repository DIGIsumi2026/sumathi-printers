import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { CompanyData } from "../../../types/site";
import { imageAssets } from "../../../data/imageAssets";
import { useGsapHeroParallax } from "../../../lib/useGsapAnimations";

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
      "Premium custom packaging, folding cartons, product boxes, labels, and brand focused packaging solutions for commercial products."
  },
  {
    id: "books-magazines-brochures",
    word: "Reliable",
    eyebrow: "Books, Magazines & Brochures",
    image: imageAssets.hero.booksMagazinesBrochures,
    color: "#7a4dff",
    description:
      "Professional books, magazines, catalogs, brochures, and bound publications with clean pages, strong covers and dependable finishing."
  }
];

export default function HeroSection({ company: _company }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedSlideIndexes, setLoadedSlideIndexes] = useState<Set<number>>(
    () => new Set([0])
  );
  const activeSlide = heroSlides[activeIndex];

  useGsapHeroParallax(heroRef);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeIndex]);

  useEffect(() => {
    setLoadedSlideIndexes((current) => {
      if (current.has(activeIndex)) return current;
      const next = new Set(current);
      next.add(activeIndex);
      return next;
    });
  }, [activeIndex]);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | null = null;
    const nextIndex = (activeIndex + 1) % heroSlides.length;
    const image = new Image();

    image.src = activeSlide.image;

    const loadNextSlide = () => {
      if (cancelled) return;

      setLoadedSlideIndexes((current) => {
        if (current.has(nextIndex)) return current;
        const next = new Set(current);
        next.add(nextIndex);
        return next;
      });
    };

    const scheduleNextSlide = () => {
      const requestIdle = (
        window as Window & {
          requestIdleCallback?: (callback: () => void) => number;
        }
      ).requestIdleCallback;

      if (requestIdle) {
        idleId = requestIdle(loadNextSlide);
      } else {
        idleId = window.setTimeout(loadNextSlide, 220);
      }
    };

    const decode = image.decode?.() ?? Promise.resolve();
    decode.then(scheduleNextSlide).catch(scheduleNextSlide);

    return () => {
      cancelled = true;

      if (idleId !== null) {
        const cancelIdle = (
          window as Window & {
            cancelIdleCallback?: (id: number) => void;
          }
        ).cancelIdleCallback;

        if (cancelIdle) {
          cancelIdle(idleId);
        } else {
          window.clearTimeout(idleId);
        }
      }
    };
  }, [activeIndex, activeSlide.image]);

  const heroStyle = useMemo(
    () =>
      ({
        "--hero-accent": activeSlide.color,
        "--hero-duration": `${SLIDE_DURATION}ms`
      }) as CSSProperties,
    [activeSlide.color]
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="sp-hero-section"
      style={heroStyle}
      data-gsap-hero
      data-watermark-section
    >
      <div className="sp-hero-background">
        {heroSlides.map((slide, index) => loadedSlideIndexes.has(index) && (
          <img
            key={slide.id}
            src={slide.image}
            alt={`${slide.eyebrow} service`}
            className={`sp-hero-bg-image ${
              index === activeIndex ? "is-active" : ""
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        ))}
      </div>

      <div className="sp-hero-overlay" />
      <div className="sp-hero-grid-pattern" />

      <span className="sp-hero-watermark" data-section-watermark>SUMATHI PRINTERS</span>

      <div className="container sp-hero-container">
        <div className="sp-hero-process-wrap" aria-label="Hero slide progress">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Show ${slide.eyebrow}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`sp-hero-process-dot ${
                activeIndex === index ? "is-active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="sp-hero-content" data-gsap-hero-content>
          <div className="sp-hero-eyebrow">
            <span>{activeSlide.eyebrow}</span>
          </div>

          <h1 className="sp-section-heading sp-hero-title">
            <span>Printing Solutions</span>

            <span key={activeSlide.word} className="sp-hero-changing-word">
              {activeSlide.word}
            </span>

            <span>For Your Brand</span>
          </h1>

          <p key={activeSlide.id} className="sp-hero-description">
            {activeSlide.description}
          </p>
        </div>
      </div>
    </section>
  );
}
