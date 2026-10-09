import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { CheckCircle2, Layers3, Sparkles } from "lucide-react";
import { imageAssets } from "../../../data/imageAssets";

type WhyChooseItem = {
  id: string;
  title: string;
  kicker: string;
  image: string;
  points: string[];
  direction: "left" | "right";
  fallbackColors: [string, string, string];
};

const whyChooseItems: WhyChooseItem[] = [
  {
    id: "quality-custom",
    title: "Exceptional Print Quality",
    kicker: "Quality & Customization",
    image: imageAssets.services.whyChoose01,
    points: ["High quality printing output", "Customized printing solutions"],
    direction: "left",
    fallbackColors: ["#38c7ff", "#7a4dff", "#f6a13d"]
  },
  {
    id: "equipment-service",
    title: "Advanced Technology & Support",
    kicker: "Technology & Service",
    image: imageAssets.services.whyChoose02,
    points: [
      "Modern printing equipment",
      "Friendly and professional customer service"
    ],
    direction: "right",
    fallbackColors: ["#7a4dff", "#38c7ff", "#e72a9a"]
  },
  {
    id: "delivery-pricing",
    title: "Reliable Value",
    kicker: "Speed & Value",
    image: imageAssets.services.whyChoose03,
    points: ["Fast and reliable delivery", "Affordable and competitive prices"],
    direction: "left",
    fallbackColors: ["#f6a13d", "#e72a9a", "#7a4dff"]
  }
];

function rgbToCss(r: number, g: number, b: number) {
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgbCss(hex: string) {
  const cleanHex = hex.replace("#", "");
  const value = parseInt(cleanHex, 16);

  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgb(${r}, ${g}, ${b})`;
}

function softColor(color: string, opacity: number) {
  if (color.startsWith("rgb(")) {
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  }

  if (color.startsWith("#")) {
    return hexToRgbCss(color)
      .replace("rgb", "rgba")
      .replace(")", `, ${opacity})`);
  }

  return color;
}

function extractImageColors(
  image: HTMLImageElement,
  fallbackColors: [string, string, string]
): [string, string, string] {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", {
      willReadFrequently: true
    });

    if (!context) return fallbackColors;

    const size = 80;
    canvas.width = size;
    canvas.height = size;

    context.drawImage(image, 0, 0, size, size);

    const imageData = context.getImageData(0, 0, size, size).data;

    const colorBuckets: Array<{
      r: number;
      g: number;
      b: number;
      score: number;
    }> = [];

    for (let i = 0; i < imageData.length; i += 4 * 8) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const a = imageData[i + 3];

      if (a < 180) continue;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const saturation = max - min;
      const brightness = (r + g + b) / 3;

      if (brightness < 35 || brightness > 238 || saturation < 22) continue;

      const score = saturation * 1.4 + brightness * 0.35;

      colorBuckets.push({ r, g, b, score });
    }

    const selected: Array<{
      r: number;
      g: number;
      b: number;
      score: number;
    }> = [];

    colorBuckets
      .sort((a, b) => b.score - a.score)
      .forEach((color) => {
        const isTooClose = selected.some((existing) => {
          const distance =
            Math.abs(existing.r - color.r) +
            Math.abs(existing.g - color.g) +
            Math.abs(existing.b - color.b);

          return distance < 90;
        });

        if (!isTooClose && selected.length < 3) {
          selected.push(color);
        }
      });

    if (selected.length >= 3) {
      return [
        rgbToCss(selected[0].r, selected[0].g, selected[0].b),
        rgbToCss(selected[1].r, selected[1].g, selected[1].b),
        rgbToCss(selected[2].r, selected[2].g, selected[2].b)
      ];
    }

    if (selected.length === 2) {
      return [
        rgbToCss(selected[0].r, selected[0].g, selected[0].b),
        rgbToCss(selected[1].r, selected[1].g, selected[1].b),
        fallbackColors[2]
      ];
    }

    if (selected.length === 1) {
      return [
        rgbToCss(selected[0].r, selected[0].g, selected[0].b),
        fallbackColors[1],
        fallbackColors[2]
      ];
    }

    return fallbackColors;
  } catch {
    return fallbackColors;
  }
}

function WhyChooseLayerCard({
  item,
  index,
  activeIndex
}: {
  item: WhyChooseItem;
  index: number;
  activeIndex: number;
}) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [colors, setColors] = useState<[string, string, string]>(
    item.fallbackColors
  );

  const extractColors = () => {
    const image = imageRef.current;
    if (!image) return;

    const extractedColors = extractImageColors(image, item.fallbackColors);
    setColors(extractedColors);
  };

  const imageRight = index % 2 === 0;
  const depth = Math.abs(activeIndex - index);

  let stateClass = "is-future";

  if (index === activeIndex) {
    stateClass = "is-active";
  } else if (index < activeIndex) {
    stateClass = "is-past";
  } else if (index === activeIndex + 1) {
    stateClass = "is-next";
  }

  const style =
    {
      "--why-color-one": colors[0],
      "--why-color-two": colors[1],
      "--why-color-three": colors[2],
      "--why-soft-one": softColor(colors[0], 0.22),
      "--why-soft-two": softColor(colors[1], 0.18),
      "--why-soft-three": softColor(colors[2], 0.15),
      "--why-layer-depth": depth
    } as CSSProperties;

  return (
    <article
      className={`sp-why-layer-card ${stateClass} ${
        imageRight ? "image-right" : "image-left"
      }`}
      style={style}
      aria-hidden={index !== activeIndex}
    >
      <div className="sp-why-media-wrap">
        <span className="sp-why-image-glow" />
        <span className="sp-why-image-border" />

        <div className="sp-why-media">
          <img
            ref={imageRef}
            src={item.image}
            alt={item.title}
            className="sp-why-image"
            onLoad={extractColors}
            draggable={false}
            loading="lazy"
            decoding="async"
          />

          <div className="sp-why-image-overlay" />

          <div className="sp-why-inside-label">
            <Sparkles size={15} />
            <span>{item.kicker}</span>
          </div>
        </div>
      </div>

      <div
        className={`sp-why-text-panel ${
          item.direction === "left" ? "to-left" : "to-right"
        }`}
      >
        <div className="sp-why-text-glass">
          <span className="sp-why-kicker">{item.kicker}</span>

          <h3>{item.title}</h3>

          <div className="sp-why-point-list">
            {item.points.map((point) => (
              <div key={point} className="sp-why-point-chip">
                <CheckCircle2 size={17} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function WhyChooseUsSection() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const gestureRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.2),
      { threshold: [0, 0.2] }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    motionQuery.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      motionQuery.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isInView || !isDocumentVisible || prefersReducedMotion ||
        isHovered || isDragging || isKeyboardFocused) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % whyChooseItems.length);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isInView, isDocumentVisible, prefersReducedMotion,
      isHovered, isDragging, isKeyboardFocused]);

  const changeSlide = (direction: number) => {
    setActiveIndex((current) =>
      (current + direction + whyChooseItems.length) % whyChooseItems.length
    );
  };

  const cancelGesture = () => {
    gestureRef.current = null;
    setIsDragging(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || gestureRef.current) return;
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;
    cancelGesture();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    // Horizontal swipes navigate; vertical gestures remain normal page scrolling.
    if (Math.abs(deltaX) >= 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      changeSlide(deltaX < 0 ? 1 : -1);
    }
  };

  return (
    <section
      id="why-choose-us"
      className="sp-why-section sp-why-layer-section"
      data-watermark-section
    >
      <span className="sp-why-watermark" data-section-watermark>WHY CHOOSE US</span>

      <span className="sp-why-bg-orb sp-why-bg-orb-one" />
      <span className="sp-why-bg-orb sp-why-bg-orb-two" />
      <span className="sp-why-bg-orb sp-why-bg-orb-three" />
      <span className="sp-why-bg-ring sp-why-bg-ring-one" />
      <span className="sp-why-bg-ring sp-why-bg-ring-two" />
      <span className="sp-why-bg-shape sp-why-bg-shape-one" />
      <span className="sp-why-bg-shape sp-why-bg-shape-two" />

      <div className="sp-why-sticky">
        <div className="container sp-why-container">
          <div className="sp-why-header">
            <div className="sp-why-eyebrow">
              <Layers3 size={15} />
              <span>Why Choose Us</span>
            </div>

            <h2 className="sp-section-heading">Why Businesses Trust Sumathi Printers</h2>

            <p>
              We combine premium print quality, modern production technology,
              customized solutions and dependable service to deliver print
              results your brand can trust.
            </p>
          </div>

          <div
            ref={stageRef}
            className="sp-why-deck-stage"
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setIsHovered(true);
            }}
            onPointerLeave={() => setIsHovered(false)}
            onPointerDownCapture={() => setIsKeyboardFocused(false)}
            onFocus={(event) => {
              if (event.target.matches(":focus-visible")) setIsKeyboardFocused(true);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsKeyboardFocused(false);
              }
            }}
          >
            <div className="sp-why-layer-count">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <small>/ 03</small>
            </div>

            <div
              className={`sp-why-deck${isDragging ? " is-dragging" : ""}`}
              role="region"
              aria-roledescription="carousel"
              aria-label="Why choose Sumathi Printers"
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={cancelGesture}
              onLostPointerCapture={cancelGesture}
              onKeyDown={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                event.preventDefault();
                changeSlide(event.key === "ArrowRight" ? 1 : -1);
              }}
            >
              {whyChooseItems.map((item, index) => (
                <WhyChooseLayerCard
                  key={item.id}
                  item={item}
                  index={index}
                  activeIndex={activeIndex}
                />
              ))}
            </div>

            <div className="sp-why-layer-dots" aria-label="Why choose us layers">
              {whyChooseItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={activeIndex === index ? "is-active" : ""}
                  aria-label={`Show ${item.kicker}`}
                  aria-pressed={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
