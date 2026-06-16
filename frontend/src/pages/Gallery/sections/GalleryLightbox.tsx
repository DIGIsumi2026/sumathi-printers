import { useEffect, useState } from "react";
import type { CSSProperties, PointerEvent, WheelEvent } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import type { GalleryItem } from "../galleryData";

type GalleryLightboxProps = {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (index: number | null) => void;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

function clampZoom(value: number) {
  return Math.min(Math.max(value, MIN_ZOOM), MAX_ZOOM);
}

export default function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onChange
}: GalleryLightboxProps) {
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  useEffect(() => {
    document.body.classList.toggle("sp-gallery-lightbox-open", !!activeItem);

    return () => {
      document.body.classList.remove("sp-gallery-lightbox-open");
    };
  }, [activeItem]);

  useEffect(() => {
    setZoom(1);
    setZoomOrigin("50% 50%");
  }, [activeItem?.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeIndex === null) return;

      if (event.key === "Escape") onClose();

      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % items.length);
      }

      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + items.length) % items.length);
      }

      if (event.key === "+" || event.key === "=") {
        setZoom((current) => clampZoom(current + ZOOM_STEP));
      }

      if (event.key === "-") {
        setZoom((current) => clampZoom(current - ZOOM_STEP));
      }

      if (event.key === "0") {
        setZoom(1);
        setZoomOrigin("50% 50%");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, items.length, onChange, onClose]);

  if (!activeItem || activeIndex === null) return null;

  const showNextImage = () => {
    onChange((activeIndex + 1) % items.length);
  };

  const showPreviousImage = () => {
    onChange((activeIndex - 1 + items.length) % items.length);
  };

  const zoomIn = () => {
    setZoom((current) => clampZoom(current + ZOOM_STEP));
  };

  const zoomOut = () => {
    setZoom((current) => clampZoom(current - ZOOM_STEP));
  };

  const resetZoom = () => {
    setZoom(1);
    setZoomOrigin("50% 50%");
  };

  const handleImagePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomOrigin(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  };

  const handleImageWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomOrigin(`${x.toFixed(2)}% ${y.toFixed(2)}%`);

    setZoom((current) => {
      const direction = event.deltaY < 0 ? 1 : -1;
      return clampZoom(current + direction * ZOOM_STEP);
    });
  };

  const handleImageDoubleClick = () => {
    if (zoom > 1) {
      resetZoom();
      return;
    }

    setZoom(2);
  };

  return (
    <div className="sp-gallery-lightbox" role="dialog" aria-modal="true">
      <button
        type="button"
        className="sp-gallery-lightbox-close"
        aria-label="Close gallery lightbox"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      <div className="sp-gallery-lightbox-zoom-controls" aria-label="Image zoom controls">
        <button type="button" aria-label="Zoom in" onClick={zoomIn}>
          <ZoomIn size={19} />
        </button>

        <button type="button" aria-label="Zoom out" onClick={zoomOut}>
          <ZoomOut size={19} />
        </button>

        <button type="button" aria-label="Reset zoom" onClick={resetZoom}>
          <RotateCcw size={18} />
        </button>

        <span>{Math.round(zoom * 100)}%</span>
      </div>

      <div className="sp-gallery-lightbox-layout">
        <div
          key={`${activeItem.id}-image`}
          className={`sp-gallery-lightbox-media ${zoom > 1 ? "is-zoomed" : ""}`}
          onPointerMove={handleImagePointerMove}
          onWheel={handleImageWheel}
          onDoubleClick={handleImageDoubleClick}
        >
          <img
            src={activeItem.image}
            alt={activeItem.title}
            loading="lazy"
            decoding="async"
            style={
              {
                "--gallery-zoom": zoom,
                "--gallery-zoom-origin": zoomOrigin
              } as CSSProperties
            }
          />
        </div>

        <aside key={`${activeItem.id}-copy`} className="sp-gallery-lightbox-details">
          <span className="sp-gallery-lightbox-count">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>

          <h3>{activeItem.title}</h3>

          <p>{activeItem.subtitle}</p>

          <div className="sp-gallery-lightbox-tags">
            {activeItem.categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>

          <small>
            Use the zoom buttons, mouse wheel, or double-click the image to inspect
            paper texture, finishing detail, and print quality.
          </small>
        </aside>
      </div>

      <button
        type="button"
        className="sp-gallery-lightbox-nav previous"
        aria-label="Previous image"
        onClick={showPreviousImage}
      >
        <ArrowLeft size={24} />
      </button>

      <button
        type="button"
        className="sp-gallery-lightbox-nav next"
        aria-label="Next image"
        onClick={showNextImage}
      >
        <ArrowRight size={24} />
      </button>
    </div>
  );
}
