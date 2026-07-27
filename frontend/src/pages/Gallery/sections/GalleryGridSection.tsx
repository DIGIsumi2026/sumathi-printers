import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import GalleryLightbox from "./GalleryLightbox";
import { useGsapGalleryReveal } from "../../../lib/useGsapAnimations";
import {
  galleryFilters,
  galleryItems,
  type GalleryCategory
} from "../galleryData";

export default function GalleryGridSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null
  );
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  useGsapGalleryReveal(sectionRef, activeFilter);

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
      <section ref={sectionRef} className="sp-gallery-grid-section" data-watermark-section>
        <span className="sp-gallery-watermark sp-gallery-watermark-right" data-section-watermark>
          PORTFOLIO
        </span>

        <span className="sp-gallery-float-orb sp-gallery-grid-orb-one" />
        <span className="sp-gallery-float-orb sp-gallery-grid-orb-two" />
        <span className="sp-gallery-float-ring sp-gallery-grid-ring-one" />
        <span className="sp-gallery-float-shape sp-gallery-grid-shape-one" />

        <div className="container sp-gallery-grid-container">
          <div className="sp-gallery-filter-area">
            {/* Desktop: static filter bar (hidden on mobile via CSS) */}
            <div className="sp-gallery-filter-bar sp-gallery-filter-bar-desktop">
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

            {/* Mobile: infinite ticker (hidden on desktop via CSS) */}
            <div className="sp-gallery-filter-ticker" aria-hidden="false">
              <div className="sp-gallery-filter-ticker-track">
                {/* First set */}
                {galleryFilters.map((filter) => (
                  <button
                    key={`a-${filter}`}
                    type="button"
                    className={activeFilter === filter ? "is-active" : ""}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
                {/* Duplicate set for seamless loop */}
                {galleryFilters.map((filter) => (
                  <button
                    key={`b-${filter}`}
                    type="button"
                    className={activeFilter === filter ? "is-active" : ""}
                    aria-hidden="true"
                    tabIndex={-1}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            key={activeFilter}
            className="sp-gallery-masonry-grid"
            data-gsap-gallery-grid
          >
            {visibleItems.map((item, index) => {
              const loadKey = `${activeFilter}-${item.id}`;
              const isLoaded = loadedImages[loadKey];

              return (
                <button
                  key={loadKey}
                  type="button"
                  data-gsap-gallery-card
                  className={`sp-gallery-card ${item.size} ${
                    isLoaded ? "is-loaded" : "is-loading"
                  }`}
                  style={
                    {
                      "--gallery-card-delay": `${Math.min(index * 55, 420)}ms`
                    } as CSSProperties
                  }
                  onClick={() => setActiveLightboxIndex(index)}
                >
                  <span className="sp-gallery-card-skeleton" aria-hidden="true" />

                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    onLoad={() =>
                      setLoadedImages((current) => ({
                        ...current,
                        [loadKey]: true
                      }))
                    }
                  />

                  <span className="sp-gallery-card-shine" />

                  <span className="sp-gallery-card-overlay">
                    <span className="sp-gallery-card-copy">
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </span>
                  </span>
                </button>
              );
            })}
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
