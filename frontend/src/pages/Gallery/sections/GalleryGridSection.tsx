import { useEffect, useMemo, useState } from "react";
import GalleryLightbox from "../sections/GalleryLightbox";
import {
  galleryFilters,
  galleryItems,
  type GalleryCategory
} from "../galleryData";

export default function GalleryGridSection() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null
  );

  const visibleItems = useMemo(() => {
    if (activeFilter === "All") return galleryItems;

    return galleryItems.filter((item) =>
      item.categories.includes(activeFilter)
    );
  }, [activeFilter]);

  useEffect(() => {
    setActiveLightboxIndex(null);
  }, [activeFilter]);

  return (
    <>
      <section className="sp-gallery-grid-section">
        <span className="sp-gallery-watermark sp-gallery-watermark-right">
          PORTFOLIO
        </span>

        <span className="sp-gallery-float-orb sp-gallery-grid-orb-one" />
        <span className="sp-gallery-float-orb sp-gallery-grid-orb-two" />
        <span className="sp-gallery-float-ring sp-gallery-grid-ring-one" />
        <span className="sp-gallery-float-shape sp-gallery-grid-shape-one" />

        <div className="container sp-gallery-grid-container">
          <div className="sp-gallery-filter-bar">
            {galleryFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="sp-gallery-masonry-grid">
            {visibleItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`sp-gallery-card ${item.size}`}
                onClick={() => setActiveLightboxIndex(index)}
              >
                <img src={item.image} alt={item.title} draggable={false} />

                <span className="sp-gallery-card-shine" />

                <span className="sp-gallery-card-overlay">
                  <span className="sp-gallery-card-copy">
                    <strong>{item.title}</strong>
                    <small>{item.subtitle}</small>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <GalleryLightbox
        items={visibleItems}
        activeIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onChange={setActiveLightboxIndex}
      />
    </>
  );
}