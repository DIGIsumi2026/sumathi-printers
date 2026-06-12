import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { imageAssets } from "../../../data/imageAssets";

type ServiceItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  accent: string;
};

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Offset Printing",
    description:
      "High-volume, premium-quality lithography delivering crisp, vibrant, and consistent results. Equipped with state-of-the-art machinery, we handle major print runs efficiently while ensuring every page meets exacting international standards.",
    image: imageAssets.serviceCards.offsetPrintingstat,
    accent: "linear-gradient(135deg, #34c8ff 0%, #7a4dff 55%, #f24cae 100%)"
  },
  {
    id: 2,
    title: "Graphic Designing",
    description:
      "Creative, professional design solutions tailored to visually communicate your brand's unique identity. Our experienced team works closely with you to transform raw concepts into stunning visual assets perfectly optimized for print.",
    image: imageAssets.serviceCards.graphicDesigningstat,
    accent: "linear-gradient(135deg, #7a4dff 0%, #d846b9 55%, #ffb36b 100%)"
  },
  {
    id: 3,
    title: "Flyers & Leaflets",
    description:
      "Eye-catching promotional materials crafted to maximize your marketing reach and audience engagement. Whether for a targeted local campaign or a major corporate event, we provide crisp folding and vibrant colors that make your message stand out.",
    image: imageAssets.serviceCards.flyersLeafletsstat,
    accent: "linear-gradient(135deg, #2ec7ff 0%, #4b86ff 50%, #8a5cff 100%)"
  },
  {
    id: 4,
    title: "Bill Books & Letterheads",
    description:
      "Premium corporate stationery designed to leave a lasting, professional impression on your clients. We offer customized, serialized, and beautifully bound business forms that reflect your company's credibility and attention to detail.",
    image: imageAssets.serviceCards.billBooksLetterheadsstat,
    accent: "linear-gradient(135deg, #5cb6ff 0%, #7f7cff 55%, #d06bff 100%)"
  },
  {
    id: 5,
    title: "Envelopes",
    description:
      "Custom-printed, branded envelopes that add a sophisticated touch to your business correspondence. Available in various sizes and finishes, they ensure your brand is recognized the moment it lands in the recipient's hands.",
    image: imageAssets.serviceCards.envelopesstat,
    accent: "linear-gradient(135deg, #3fc5ff 0%, #716dff 50%, #bd77ff 100%)"
  },
  {
    id: 6,
    title: "Certificate Printing",
    description:
      "Elegant, secure, and high-quality prints to professionally honor and recognize achievements. We utilize premium paper stocks and specialized finishing options—like gold foiling—to give your certificates a true mark of prestige.",
    image: imageAssets.serviceCards.certificatePrintingstat,
    accent: "linear-gradient(135deg, #f4ba58 0%, #ff8f5a 50%, #f05cad 100%)"
  },
  {
    id: 7,
    title: "Posters & Banners",
    description:
      "High-impact, large-format printing engineered for striking visibility and vibrant color accuracy. Built to command attention, our durable prints are perfect for indoor corporate presentations and bold promotional advertising.",
    image: imageAssets.serviceCards.postersBannersstat,
    accent: "linear-gradient(135deg, #2cc7ff 0%, #4f7eff 55%, #f15ab1 100%)"
  },
  {
    id: 8,
    title: "Calendars & Diaries",
    description:
      "Custom-branded, beautifully finished corporate gifts perfect for year-round brand presence. From wall calendars to premium executive diaries, we offer high-quality bindings and finishes that keep your business in sight every single day.",
    image: imageAssets.serviceCards.calendarsDiariesstat,
    accent: "linear-gradient(135deg, #5caeff 0%, #6d6cff 55%, #d96eff 100%)"
  },
  {
    id: 9,
    title: "Packaging Box Printing",
    description:
      "Durable, attractive packaging solutions that protect your products while elevating your brand presentation. We combine precise cutting with custom finishes to create structural packaging that truly stands out on the shelf.",
    image: imageAssets.serviceCards.packagingBoxPrintingstat,
    accent: "linear-gradient(135deg, #f6a650 0%, #ff7f7d 50%, #d95dff 100%)"
  },
  {
    id: 10,
    title: "Books & Magazine Printing",
    description:
      "Flawless multi-page printing paired with superior binding for professional, high-end publications. Whether you need perfect binding or hard case finishing, we deliver crisp text and rich images for a premium reading experience.",
    image: imageAssets.serviceCards.booksMagazinesPrintingstat,
    accent: "linear-gradient(135deg, #34c8ff 0%, #6f73ff 50%, #b95fff 100%)"
  },
  {
    id: 11,
    title: "Stickers & Labels",
    description:
      "Precision-cut, vibrant, and durable decals ideal for product branding and packaging details. Our labels are printed with high-adhesion materials and sharp graphics to ensure your products look professional and appealing.",
    image: imageAssets.serviceCards.stickersLabelsstat,
    accent: "linear-gradient(135deg, #2dd2ff 0%, #57a5ff 45%, #f154a6 100%)"
  },
  {
    id: 12,
    title: "Brochures & Catalogs",
    description:
      "High-resolution, multi-fold informational prints that elegantly showcase your company's complete offerings. We provide various folding options alongside glossy or matte finishes to create a tactile, engaging experience for your prospective clients.",
    image: imageAssets.serviceCards.brochuresCatalogsstat,
    accent: "linear-gradient(135deg, #49c6ff 0%, #6b7bff 55%, #ff7aa3 100%)"
  }
];

function chunkArray<T>(items: T[], size: number) {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

export default function ServicesGridSection() {
  const [activeId, setActiveId] = useState<number>(1);

  const rows = useMemo(() => chunkArray(services, 4), []);

  const getRowTemplate = (row: ServiceItem[]) => {
    const activeIndex = row.findIndex((item) => item.id === activeId);

    if (activeIndex === -1) {
      return "1fr 1fr 1fr 1fr";
    }

    return row
      .map((_, index) => (index === activeIndex ? "1.95fr" : "0.68fr"))
      .join(" ");
  };

  return (
    <section id="all-services" className="sp-services-grid-section">
      <span className="sp-services-grid-watermark">OUR SERVICES</span>

      <span className="sp-services-grid-shape sp-services-grid-shape-one" />
      <span className="sp-services-grid-shape sp-services-grid-shape-two" />
      <span className="sp-services-grid-shape sp-services-grid-shape-three" />

      <div className="container">
        <div className="sp-services-grid-header" data-reveal="up">
          <div className="sp-services-grid-eyebrow">
            <Sparkles size={14} />
            <span>What We Offer</span>
          </div>

          <h2 className="sp-services-grid-title">
            Premium Printing Services For Every Business Need
          </h2>

          <p className="sp-services-grid-description">
            Explore our complete range of printing, finishing, packaging and
            design solutions—crafted to deliver quality, consistency and strong
            visual impact across every project.
          </p>
        </div>

        <div className="sp-services-grid-shell">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="sp-services-grid-row"
              style={
                {
                  "--services-row-template": getRowTemplate(row)
                } as CSSProperties
              }
            >
              {row.map((service) => {
                const isActive = activeId === service.id;

                return (
                  <article
                    key={service.id}
                    className={`sp-service-card ${isActive ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveId(service.id)}
                    onFocus={() => setActiveId(service.id)}
                    onClick={() => setActiveId(service.id)}
                    tabIndex={0}
                    style={
                      {
                        "--service-accent": service.accent
                      } as CSSProperties
                    }
                  >
                    <div className="sp-service-card-media">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="sp-service-card-image sp-service-card-image-color"
                      />
                      <img
                        src={service.image}
                        alt=""
                        aria-hidden="true"
                        className="sp-service-card-image sp-service-card-image-mono"
                      />
                      <div className="sp-service-card-overlay" />
                      <div className="sp-service-card-overlay-gradient" />
                    </div>

                    <div className="sp-service-card-content">
                      <div className="sp-service-card-topline">
                        <span className="sp-service-card-number">
                          {String(service.id).padStart(2, "0")}
                        </span>
                        <span className="sp-service-card-badge">
                          Print Solution
                        </span>
                      </div>

                      <h3 className="sp-service-card-title">
                        {service.title}
                      </h3>

                      <div className="sp-service-card-expand">
                        <p className="sp-service-card-text">
                          {service.description}
                        </p>

                        <span className="sp-service-card-cta">
                          <span>Explore Service</span>
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}