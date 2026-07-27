import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "../../lib/gsap";
import { useScrollLock } from "../../contexts/ScrollLockContext";
import { useMediaPlaybackPolicy } from "../../hooks/useMediaPlaybackPolicy";

export default function SmoothScroll() {
  const { registerLenis } = useScrollLock();
  const { shouldUseSmoothScroll } = useMediaPlaybackPolicy();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!shouldUseSmoothScroll) {
      registerLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15
    });

    // Register with context so NavigationBar can stop/start it.
    registerLenis(lenis);

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      window.cancelAnimationFrame(frameId);
      registerLenis(null);
      lenis.destroy();
    };
  }, [registerLenis, shouldUseSmoothScroll]);

  return null;
}
