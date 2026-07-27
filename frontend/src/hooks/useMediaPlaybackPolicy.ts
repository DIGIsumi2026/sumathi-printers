import { RefObject, useEffect, useState } from "react";

type NetworkInformationLike = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
  mozConnection?: NetworkInformationLike;
  webkitConnection?: NetworkInformationLike;
};

export type MediaPlaybackPolicy = {
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  saveData: boolean;
  isSlowConnection: boolean;
  hasFinePointer: boolean;
  hasHover: boolean;
  shouldPlayHeroVideo: boolean;
  shouldAnimateHeavy: boolean;
  shouldUseSmoothScroll: boolean;
};

const desktopQuery = "(min-width: 1025px)";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const finePointerQuery = "(pointer: fine)";
const hoverQuery = "(hover: hover)";
const slowConnectionTypes = new Set(["slow-2g", "2g"]);

function getConnection() {
  if (typeof navigator === "undefined") return undefined;

  const nav = navigator as NavigatorWithConnection;
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
}

export function getMediaPlaybackPolicy(): MediaPlaybackPolicy {
  if (typeof window === "undefined") {
    return {
      isDesktop: false,
      prefersReducedMotion: true,
      saveData: false,
      isSlowConnection: false,
      hasFinePointer: false,
      hasHover: false,
      shouldPlayHeroVideo: false,
      shouldAnimateHeavy: false,
      shouldUseSmoothScroll: false
    };
  }

  const connection = getConnection();
  const isDesktop = window.matchMedia(desktopQuery).matches;
  const prefersReducedMotion = window.matchMedia(reducedMotionQuery).matches;
  const saveData = Boolean(connection?.saveData);
  const isSlowConnection = slowConnectionTypes.has(connection?.effectiveType ?? "");
  const hasFinePointer = window.matchMedia(finePointerQuery).matches;
  const hasHover = window.matchMedia(hoverQuery).matches;
  const canPlayRichMedia =
    isDesktop && !prefersReducedMotion && !saveData && !isSlowConnection;

  return {
    isDesktop,
    prefersReducedMotion,
    saveData,
    isSlowConnection,
    hasFinePointer,
    hasHover,
    shouldPlayHeroVideo: canPlayRichMedia,
    shouldAnimateHeavy: canPlayRichMedia,
    shouldUseSmoothScroll: canPlayRichMedia && hasFinePointer && hasHover
  };
}

export function useMediaPlaybackPolicy() {
  const [policy, setPolicy] = useState<MediaPlaybackPolicy>(() =>
    getMediaPlaybackPolicy()
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => setPolicy(getMediaPlaybackPolicy());
    const queries = [
      window.matchMedia(desktopQuery),
      window.matchMedia(reducedMotionQuery),
      window.matchMedia(finePointerQuery),
      window.matchMedia(hoverQuery)
    ];
    const connection = getConnection();

    queries.forEach((query) => query.addEventListener("change", update));
    connection?.addEventListener?.("change", update);
    update();

    return () => {
      queries.forEach((query) => query.removeEventListener("change", update));
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  return policy;
}

export function useManagedHeroVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  sectionRef: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section || !enabled) {
      videoRef.current?.pause();
      return;
    }

    let isVisible = false;

    const syncPlayback = () => {
      if (document.visibilityState === "visible" && isVisible) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [enabled, sectionRef, videoRef]);
}
