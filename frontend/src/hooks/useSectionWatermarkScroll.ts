import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

const SAFE_PADDING = 40;

type WatermarkBounds = {
  startY: number;
  endY: number;
};

function getWatermarkBounds(
  section: HTMLElement,
  watermark: HTMLElement
): WatermarkBounds {
  const sectionHeight = section.offsetHeight;
  const watermarkHeight = watermark.offsetHeight;
  const availableSpace = Math.max(0, sectionHeight - watermarkHeight);
  const padding = Math.min(SAFE_PADDING, availableSpace / 2);

  return {
    startY: Math.max(padding, availableSpace - padding),
    endY: padding
  };
}

export default function useSectionWatermarkScroll(
  routeKey: string,
  ready = true
) {
  useGSAP(
    () => {
      if (!ready) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const watermarks = gsap.utils.toArray<HTMLElement>(
          "[data-section-watermark]"
        );

        watermarks.forEach((watermark) => {
          const section = watermark.closest<HTMLElement>(
            "[data-watermark-section]"
          );
          if (!section) return;

          gsap.set(watermark, { yPercent: 0 });

          gsap.fromTo(
            watermark,
            {
              y: () => getWatermarkBounds(section, watermark).startY
            },
            {
              y: () => getWatermarkBounds(section, watermark).endY,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true
              }
            }
          );
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const watermarks = gsap.utils.toArray<HTMLElement>(
          "[data-section-watermark]"
        );

        watermarks.forEach((watermark) => {
          const section = watermark.closest<HTMLElement>(
            "[data-watermark-section]"
          );
          if (!section) return;

          gsap.set(watermark, {
            yPercent: 0,
            y: () => getWatermarkBounds(section, watermark).endY
          });
        });
      });

      ScrollTrigger.refresh();

      return () => media.revert();
    },
    {
      dependencies: [routeKey, ready],
      revertOnUpdate: true
    }
  );
}
