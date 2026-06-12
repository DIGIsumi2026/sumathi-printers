import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const isLayerChangingRef = useRef(false);
  const layerChangeTimerRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const maxIndex = whyChooseItems.length - 1;
    const transitionDuration = 760;
    const wheelThreshold = 14;
    const touchThreshold = 42;

    const isSectionReadyToLock = () => {
      const section = sectionRef.current;
      if (!section) return false;

      const rect = section.getBoundingClientRect();

      return (
        rect.top <= window.innerHeight * 0.16 &&
        rect.bottom >= window.innerHeight * 0.72
      );
    };

    const changeLayer = (nextIndex: number) => {
      const safeNextIndex = Math.min(Math.max(nextIndex, 0), maxIndex);

      if (safeNextIndex === activeIndexRef.current) return;

      isLayerChangingRef.current = true;
      activeIndexRef.current = safeNextIndex;
      setActiveIndex(safeNextIndex);

      if (layerChangeTimerRef.current) {
        window.clearTimeout(layerChangeTimerRef.current);
      }

      layerChangeTimerRef.current = window.setTimeout(() => {
        isLayerChangingRef.current = false;
      }, transitionDuration);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isSectionReadyToLock()) return;

      const currentIndex = activeIndexRef.current;
      const isScrollingDown = event.deltaY > wheelThreshold;
      const isScrollingUp = event.deltaY < -wheelThreshold;

      if (!isScrollingDown && !isScrollingUp) return;

      if (isLayerChangingRef.current) {
        event.preventDefault();
        return;
      }

      if (isScrollingDown && currentIndex < maxIndex) {
        event.preventDefault();
        changeLayer(currentIndex + 1);
        return;
      }

      if (isScrollingUp && currentIndex > 0) {
        event.preventDefault();
        changeLayer(currentIndex - 1);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isSectionReadyToLock()) return;
      if (touchStartYRef.current === null) return;

      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const deltaY = touchStartYRef.current - currentY;

      const currentIndex = activeIndexRef.current;
      const isSwipingDownPage = deltaY > touchThreshold;
      const isSwipingUpPage = deltaY < -touchThreshold;

      if (!isSwipingDownPage && !isSwipingUpPage) return;

      if (isLayerChangingRef.current) {
        event.preventDefault();
        return;
      }

      if (isSwipingDownPage && currentIndex < maxIndex) {
        event.preventDefault();
        touchStartYRef.current = currentY;
        changeLayer(currentIndex + 1);
        return;
      }

      if (isSwipingUpPage && currentIndex > 0) {
        event.preventDefault();
        touchStartYRef.current = currentY;
        changeLayer(currentIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);

      if (layerChangeTimerRef.current) {
        window.clearTimeout(layerChangeTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="sp-why-section sp-why-layer-section"
    >
      <span className="sp-why-watermark">WHY CHOOSE US</span>

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

            <h2>Why Businesses Trust Sumathi Printers</h2>

            <p>
              We combine premium print quality, modern production technology,
              customized solutions and dependable service to deliver print
              results your brand can trust.
            </p>
          </div>

          <div className="sp-why-deck-stage">
            <div className="sp-why-layer-count">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <small>/ 03</small>
            </div>

            <div className="sp-why-deck">
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
                  onClick={() => {
                    activeIndexRef.current = index;
                    setActiveIndex(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}