import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { imageAssets } from "../../../data/imageAssets";

type WhyChooseItem = {
  id: string;
  title: string;
  image: string;
  points: string[];
  accent: string;
  direction: "left" | "right";
};

const whyChooseItems: WhyChooseItem[] = [
  {
    id: "quality-custom",
    title: "Exceptional Print Quality",
    image: imageAssets.services.whyChoose01,
    points: [
      "High quality printing output",
      "Customized printing solutions"
    ],
    accent: "linear-gradient(135deg, #38c7ff 0%, #7a4dff 50%, #ff7b54 100%)",
    direction: "left"
  },
  {
    id: "equipment-service",
    title: "Advanced Technology & Support",
    image: imageAssets.services.whyChoose02,
    points: [
      "Modern printing equipment",
      "Friendly and professional customer service"
    ],
    accent: "linear-gradient(135deg, #7a4dff 0%, #38c7ff 50%, #e72a9a 100%)",
    direction: "right"
  },
  {
    id: "delivery-pricing",
    title: "Reliable Value",
    image: imageAssets.services.whyChoose03,
    points: [
      "Fast and reliable delivery",
      "Affordable and competitive prices"
    ],
    accent: "linear-gradient(135deg, #ff8a3d 0%, #e72a9a 50%, #7a4dff 100%)",
    direction: "left"
  }
];

function WhyChooseUsCard({ item, index }: { item: WhyChooseItem; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.28 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const imageRight = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`sp-why-card ${visible ? "is-visible" : ""} ${
        imageRight ? "image-right" : "image-left"
      }`}
      style={{ ["--why-accent" as string]: item.accent }}
    >
      <div className="sp-why-media-wrap">
        <div className="sp-why-media-border" />
        <div className="sp-why-media">
          <img src={item.image} alt={item.title} className="sp-why-image" />
          <div className="sp-why-image-overlay" />
        </div>
      </div>

      <div className={`sp-why-points ${item.direction === "left" ? "to-left" : "to-right"}`}>
        <div className="sp-why-points-inner">
          <h3>{item.title}</h3>

          <div className="sp-why-point-list">
            {item.points.map((point) => (
              <div key={point} className="sp-why-point-chip">
                <CheckCircle2 size={18} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="sp-why-section">
      <div className="container">
        <div className="sp-why-header">
          <span className="sp-why-eyebrow">Why Choose Us</span>
          <h2 className="sp-why-title">Why Businesses Trust Sumathi Printers</h2>
          <p className="sp-why-description">
            We combine quality printing, modern technology and dependable service
            to deliver printing solutions tailored to your business needs.
          </p>
        </div>

        <div className="sp-why-layout">
          <span className="sp-why-watermark">WHY CHOOSE US</span>

          <div className="sp-why-list">
            {whyChooseItems.map((item, index) => (
              <WhyChooseUsCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}