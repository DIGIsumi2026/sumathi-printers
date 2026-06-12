import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
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

    const selected: Array<{ r: number; g: number; b: number; score: number }> = [];

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

function WhyChooseUsCard({
  item,
  index
}: {
  item: WhyChooseItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [colors, setColors] = useState<[string, string, string]>(
    item.fallbackColors
  );

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.32
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const extractColors = () => {
    const image = imageRef.current;
    if (!image) return;

    const extractedColors = extractImageColors(image, item.fallbackColors);
    setColors(extractedColors);
  };

  const imageRight = index % 2 === 0;

  const style =
    {
      "--why-color-one": colors[0],
      "--why-color-two": colors[1],
      "--why-color-three": colors[2],
      "--why-soft-one": softColor(colors[0], 0.2),
      "--why-soft-two": softColor(colors[1], 0.16),
      "--why-soft-three": softColor(colors[2], 0.14)
    } as CSSProperties;

  return (
    <article
      ref={cardRef}
      className={`sp-why-card ${visible ? "is-visible" : ""} ${
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
  return (
    <section id="why-choose-us" className="sp-why-section">
      <span className="sp-why-watermark">WHY CHOOSE US</span>

      <span className="sp-why-bg-orb sp-why-bg-orb-one" />
      <span className="sp-why-bg-orb sp-why-bg-orb-two" />
      <span className="sp-why-bg-orb sp-why-bg-orb-three" />
      <span className="sp-why-bg-ring sp-why-bg-ring-one" />
      <span className="sp-why-bg-ring sp-why-bg-ring-two" />
      <span className="sp-why-bg-shape sp-why-bg-shape-one" />
      <span className="sp-why-bg-shape sp-why-bg-shape-two" />

      <div className="container sp-why-container">
        <div className="sp-why-header">
          <div className="sp-why-eyebrow">
            <Sparkles size={15} />
            <span>Why Choose Us</span>
          </div>

          <h2>Why Businesses Trust Sumathi Printers</h2>

          <p>
            We combine premium print quality, modern production technology,
            customized solutions and dependable service to deliver print results
            your brand can trust.
          </p>
        </div>

        <div className="sp-why-list">
          {whyChooseItems.map((item, index) => (
            <WhyChooseUsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}