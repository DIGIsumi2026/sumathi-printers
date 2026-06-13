import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { imageAssets } from "../../../data/imageAssets";

type FinishingService = {
  id: number;
  title: string;
  caption: string;
  description: string;
  image: string;
  accent: string;
};

const LOOP_INTERVAL = 1850;

const finishingServices: FinishingService[] = [
  {
    id: 1,
    title: "Cutting & Trimming",
    caption: "Sharp edge finishing",
    description:
      "Clean and accurate edge finishing for printed sheets, brochures, books, forms and marketing materials with precise alignment and professional trimming quality.",
    image: imageAssets.finishingServices.cuttingTrimming,
    accent: "#ff244f"
  },
  {
    id: 2,
    title: "Folding",
    caption: "Accurate paper folding",
    description:
      "Neat folding solutions for brochures, leaflets, catalogs and corporate print materials with clean crease lines, accurate sections and elegant presentation.",
    image: imageAssets.finishingServices.folding,
    accent: "#ff3f8f"
  },
  {
    id: 3,
    title: "Binding",
    caption: "Strong publication finish",
    description:
      "Durable and refined binding for books, magazines, reports, diaries and publications with strong spines, aligned pages and premium finishing quality.",
    image: imageAssets.finishingServices.binding,
    accent: "#ff5a1f"
  },
  {
    id: 4,
    title: "Lamination",
    caption: "Protective surface finish",
    description:
      "Glossy and matte lamination for printed materials that need durability, protection, smoother texture and a polished premium surface finish.",
    image: imageAssets.finishingServices.lamination,
    accent: "#36c7ff"
  },
  {
    id: 5,
    title: "Numbering",
    caption: "Sequential document control",
    description:
      "Accurate sequential numbering for forms, tickets, certificates, bill books and business documents with clean registration and organized print control.",
    image: imageAssets.finishingServices.numbering,
    accent: "#9b5cff"
  }
];

function getLoopSlot(index: number, activeIndex: number, total: number) {
  let slot = index - activeIndex;

  if (slot > total / 2) {
    slot -= total;
  }

  if (slot < -total / 2) {
    slot += total;
  }

  return slot;
}

function getSlotVisual(slot: number) {
  if (slot === 0) {
    return {
      x: "0px",
      y: "0px",
      scale: 1,
      opacity: 1,
      blur: "0px",
      rotate: "0deg",
      z: 50
    };
  }

  if (slot === -1) {
    return {
      x: "calc(var(--finish-shift) * -1)",
      y: "22px",
      scale: 0.84,
      opacity: 0.68,
      blur: "1px",
      rotate: "8deg",
      z: 35
    };
  }

  if (slot === 1) {
    return {
      x: "calc(var(--finish-shift) * 1)",
      y: "22px",
      scale: 0.84,
      opacity: 0.68,
      blur: "1px",
      rotate: "-8deg",
      z: 35
    };
  }

  if (slot === -2) {
    return {
      x: "calc(var(--finish-shift) * -2)",
      y: "48px",
      scale: 0.67,
      opacity: 0.28,
      blur: "3px",
      rotate: "14deg",
      z: 18
    };
  }

  return {
    x: "calc(var(--finish-shift) * 2)",
    y: "48px",
    scale: 0.67,
    opacity: 0.28,
    blur: "3px",
    rotate: "-14deg",
    z: 18
  };
}

export default function FinishingServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const isPaused = hoveredId !== null;

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % finishingServices.length);
    }, LOOP_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused]);

  const activeService = finishingServices[activeIndex];

  const carouselItems = useMemo(() => finishingServices, []);

  const scrollToTopServices = () => {
    const serviceSection = document.getElementById("all-services");

    if (serviceSection) {
      serviceSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section
      id="finishing-services"
      className="sp-finishing-section"
      style={
        {
          "--finish-active-accent": activeService.accent
        } as CSSProperties
      }
    >
      <span className="sp-finishing-watermark">FINISHING</span>

      <div className="sp-finishing-bg-glow" />
      <div className="sp-finishing-bg-grid" />
      <span className="sp-finishing-orb sp-finishing-orb-one" />
      <span className="sp-finishing-orb sp-finishing-orb-two" />
      <span className="sp-finishing-ring sp-finishing-ring-one" />
      <span className="sp-finishing-ring sp-finishing-ring-two" />

      <div className="container sp-finishing-container">
        <div className="sp-finishing-header">
          <div className="sp-finishing-eyebrow">
            <Sparkles size={14} />
            <span>Finishing Services</span>
          </div>

          <h2>Professional Finishing That Completes Every Print</h2>

          <p>
            From trimming and folding to binding, lamination and numbering, our
            finishing process gives every printed product a clean, durable and
            premium final result.
          </p>
        </div>

        <div
          className={`sp-finishing-carousel-stage ${
            isPaused ? "is-paused" : ""
          }`}
          onPointerLeave={() => setHoveredId(null)}
        >
          <div className="sp-finishing-red-spotlight" />

          {carouselItems.map((service, index) => {
            const slot = getLoopSlot(
              index,
              activeIndex,
              finishingServices.length
            );
            const visual = getSlotVisual(slot);
            const isHovered = hoveredId === service.id;
            const isCenter = slot === 0;
            const isMuted = isPaused && !isHovered;

            const finalScale = isHovered
              ? Number(visual.scale) + 0.065
              : visual.scale;

            const cardStyle =
              {
                "--finish-x": visual.x,
                "--finish-y": visual.y,
                "--finish-scale": finalScale,
                "--finish-opacity": isHovered ? 1 : visual.opacity,
                "--finish-blur": isHovered ? "0px" : visual.blur,
                "--finish-rotate": visual.rotate,
                "--finish-z": isHovered ? 80 : visual.z,
                "--finish-card-accent": service.accent
              } as CSSProperties;

            return (
              <article
                key={service.id}
                className={`sp-finishing-card ${
                  isCenter ? "is-center" : ""
                } ${isHovered ? "is-hovered" : ""} ${
                  isMuted ? "is-muted" : ""
                }`}
                style={cardStyle}
                onPointerEnter={() => setHoveredId(service.id)}
                onClick={() => setHoveredId(service.id)}
              >
                <div className="sp-finishing-card-media">
                  <img
                    src={service.image}
                    alt={service.title}
                    draggable={false}
                    loading="lazy"
                  />

                  <div className="sp-finishing-card-shade" />
                  <div className="sp-finishing-card-bottom-fade" />
                </div>

                <div className="sp-finishing-card-content">
                  <div className="sp-finishing-card-top">
                    <span className="sp-finishing-card-dot" />
                    <span>{String(service.id).padStart(2, "0")}</span>
                  </div>

                  <div className="sp-finishing-card-info">
                    <span className="sp-finishing-card-caption">
                      {service.caption}
                    </span>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="sp-finishing-controls">
          {finishingServices.map((service, index) => (
            <button
              key={service.id}
              type="button"
              aria-label={`Show ${service.title}`}
              className={activeIndex === index ? "is-active" : ""}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="sp-finishing-actions">
          <button
            type="button"
            className="sp-finishing-action sp-finishing-action-secondary"
            onClick={scrollToTopServices}
          >
            <ArrowDown size={18} />
            <span>View All Services</span>
          </button>

          <Link
            to="/contact"
            className="sp-finishing-action sp-finishing-action-primary"
          >
            <span>Get A Quote</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}