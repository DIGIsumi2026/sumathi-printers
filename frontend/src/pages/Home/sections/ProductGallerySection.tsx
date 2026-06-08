import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";

const galleryItems = [
  {
    title: "Flyers & Leaflets",
    image: imageAssets.serviceGallery.flyersLeaflets,
    className: "zg-card-01"
  },
  {
    title: "Posters & Banners",
    image: imageAssets.serviceGallery.postersBanners,
    className: "zg-card-02"
  },
  {
    title: "Bill Books & Letterheads",
    image: imageAssets.serviceGallery.billBooksLetterheads,
    className: "zg-card-03"
  },
  {
    title: "Calendars & Diaries",
    image: imageAssets.serviceGallery.calendarsDiaries,
    className: "zg-card-04"
  },
  {
    title: "Letterheads & Envelopes",
    image: imageAssets.serviceGallery.letterheadsEnvelopes,
    className: "zg-card-05"
  },
  {
    title: "Certificates Printing",
    image: imageAssets.serviceGallery.certificatesPrinting,
    className: "zg-card-06"
  },
  {
    title: "Stickers & Labels",
    image: imageAssets.serviceGallery.stickersLabels,
    className: "zg-card-07"
  },
  {
    title: "Packaging Box Printing",
    image: imageAssets.serviceGallery.packagingBoxPrinting,
    className: "zg-card-08"
  },
  {
    title: "Brochures & Catalogs",
    image: imageAssets.serviceGallery.brochuresCatalogs,
    className: "zg-card-09"
  },
  {
    title: "Books & Magazines",
    image: imageAssets.serviceGallery.booksMagazinesPrinting,
    className: "zg-card-10"
  }
];

export default function ProductGallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const updateLayout = () => {
      setIsMobileLayout(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const galleryScale = useTransform(
    scrollYProgress,
    [0, 0.16, 0.38, 0.68, 1],
    [0.78, 1, 1.22, 1.62, 2.15]
  );

  const galleryY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.78, 1],
    [130, 20, -40, -190, -360]
  );

  const galleryOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.78, 1],
    [0, 1, 1, 0.82]
  );

  return (
    <section ref={sectionRef} className="zoom-gallery-section">
      <div className="zoom-gallery-sticky">
        <motion.div
          className="zoom-gallery-stage"
          style={
            isMobileLayout
              ? undefined
              : {
                  scale: galleryScale,
                  y: galleryY,
                  opacity: galleryOpacity
                }
          }
        >
          <span className="zoom-gallery-shape zoom-gallery-shape-one" />
          <span className="zoom-gallery-shape zoom-gallery-shape-two" />
          <span className="zoom-gallery-watermark">PRINT</span>

          <div className="zoom-gallery-grid">
            {galleryItems.map((item) => (
              <motion.article
                key={item.title}
                className={`zoom-gallery-card ${item.className}`}
                whileHover={
                  isMobileLayout
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.025
                      }
                }
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}