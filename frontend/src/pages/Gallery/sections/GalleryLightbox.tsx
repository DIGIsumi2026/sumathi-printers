import { useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryItem } from "../galleryData";

type GalleryLightboxProps = {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (index: number | null) => void;
};

export default function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onChange
}: GalleryLightboxProps) {
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  useEffect(() => {
    document.body.classList.toggle("sp-gallery-lightbox-open", !!activeItem);

    return () => {
      document.body.classList.remove("sp-gallery-lightbox-open");
    };
  }, [activeItem]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeIndex === null) return;

      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % items.length);
      }

      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + items.length) % items.length);
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

      <button
        type="button"
        className="sp-gallery-lightbox-nav previous"
        aria-label="Previous image"
        onClick={showPreviousImage}
      >
        <ArrowLeft size={24} />
      </button>

      <div className="sp-gallery-lightbox-image-wrap">
        <img src={activeItem.image} alt={activeItem.title} />
      </div>

      <button
        type="button"
        className="sp-gallery-lightbox-nav next"
        aria-label="Next image"
        onClick={showNextImage}
      >
        <ArrowRight size={24} />
      </button>

      <div className="sp-gallery-lightbox-caption">
        <span>
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>

        <h3>{activeItem.title}</h3>

        <p>{activeItem.subtitle}</p>
      </div>
    </div>
  );
}