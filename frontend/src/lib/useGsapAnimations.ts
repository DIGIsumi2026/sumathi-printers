import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import { getMediaPlaybackPolicy } from "../hooks/useMediaPlaybackPolicy";

const motionQuery = "(min-width: 1025px) and (prefers-reduced-motion: no-preference)";

export function useGsapHeroParallax(scope: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(motionQuery, () => {
        if (!getMediaPlaybackPolicy().shouldAnimateHeavy) return;

        const bg = root.querySelector<HTMLElement>("[data-gsap-hero-bg]");
        if (bg) {
          gsap.to(bg, {
            yPercent: 18,
            scale: 1.04,
            rotate: 1.4,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

      return () => mm.revert();
    },
    { scope }
  );
}

export function useGsapServicesPin(scope: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(motionQuery, () => {
        if (!getMediaPlaybackPolicy().shouldAnimateHeavy) return;

        const cards = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-gsap-service-card]")
        );

        if (cards.length === 0) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            end: "bottom 34%",
            toggleActions: "play none none reverse"
          }
        });

        timeline.fromTo(
          cards,
          {
            opacity: 0.92,
            scale: 0.985,
            y: 12
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.62,
            ease: "power2.out",
            stagger: 0.045
          }
        );
      });

      return () => mm.revert();
    },
    { scope }
  );
}

export function useGsapGalleryReveal(
  scope: RefObject<HTMLElement>,
  dependencyKey: string
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(motionQuery, () => {
        if (!getMediaPlaybackPolicy().shouldAnimateHeavy) return;

        const grid = root.querySelector<HTMLElement>("[data-gsap-gallery-grid]");
        const cards = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-gsap-gallery-card]")
        );

        if (!grid || cards.length === 0) return;

        gsap.set(cards, {
          opacity: 0,
          y: 42,
          scale: 0.94
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              once: true
            }
          })
          .to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            stagger: 0.055,
            ease: "power3.out",
            onComplete: () => ScrollTrigger.refresh()
          });
      });

      return () => mm.revert();
    },
    { dependencies: [dependencyKey], scope, revertOnUpdate: true }
  );
}

export function useGsapAboutTimeline(scope: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(motionQuery, () => {
        if (!getMediaPlaybackPolicy().shouldAnimateHeavy) return;

        const items = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll("[data-gsap-about-item]")
        );

        if (items.length === 0) return;

        gsap.set(items, {
          opacity: 0,
          y: 34,
          scale: 0.98
        });

        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.68,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            end: "bottom 38%",
            toggleActions: "play none none reverse"
          }
        });
      });

      return () => mm.revert();
    },
    { scope }
  );
}

export function useGsapCtaReveal(scope: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(motionQuery, () => {
        if (!getMediaPlaybackPolicy().shouldAnimateHeavy) return;

        const cta = root.querySelector<HTMLElement>("[data-gsap-cta]");
        const bg = root.querySelector<HTMLElement>("[data-gsap-cta-bg]");
        const content = root.querySelector<HTMLElement>("[data-gsap-cta-content]");

        if (!cta) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: cta,
            start: "top 78%",
            end: "bottom 38%",
            scrub: 0.65
          }
        });

        timeline.fromTo(
          cta,
            { opacity: 0, y: 42, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 1 },
          0
        );

        if (bg) {
          timeline.fromTo(
            bg,
            { y: 28, scale: 1.035, opacity: 0.88 },
            { y: -12, scale: 1, opacity: 1, ease: "none", duration: 1 },
            0
          );
        }

        if (content) {
          timeline.fromTo(
            content,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.82 },
            0.16
          );
        }
      });

      return () => mm.revert();
    },
    { scope }
  );
}
