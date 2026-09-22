import { useEffect, useRef } from "react";

export default function DesktopScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;

    let hideTimeout = 0;
    let frame = 0;
    let dragging = false;
    let dragStartY = 0;
    let dragStartScroll = 0;

    const update = () => {
      frame = 0;
      const scrollHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(0, scrollHeight - window.innerHeight);
      track.toggleAttribute("data-no-scroll", maxScroll === 0);
      if (!maxScroll) return;

      const trackHeight = track.clientHeight;
      const thumbHeight = Math.min(trackHeight, Math.max(36, trackHeight * window.innerHeight / scrollHeight));
      const travel = trackHeight - thumbHeight;
      const top = Math.min(maxScroll, Math.max(0, window.scrollY)) / maxScroll * travel;
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translate3d(0, ${top}px, 0)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const show = () => {
      track.classList.add("is-visible");
      window.clearTimeout(hideTimeout);
      if (!dragging) {
        hideTimeout = window.setTimeout(() => track.classList.remove("is-visible"), 1800);
      }
    };

    const onScroll = () => {
      requestUpdate();
      show();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || track.hasAttribute("data-no-scroll")) return;
      event.preventDefault();
      show();

      if (event.target !== thumb) {
        const travel = track.clientHeight - thumb.offsetHeight;
        if (travel <= 0) return;
        const position = event.clientY - track.getBoundingClientRect().top - thumb.offsetHeight / 2;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: Math.max(0, Math.min(1, position / travel)) * maxScroll, behavior: "instant" });
        return;
      }

      dragging = true;
      window.clearTimeout(hideTimeout);
      dragStartY = event.clientY;
      dragStartScroll = window.scrollY;
      thumb.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const travel = track.clientHeight - thumb.offsetHeight;
      if (travel <= 0) return;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      window.scrollTo({
        top: dragStartScroll + (event.clientY - dragStartY) / travel * maxScroll,
        behavior: "instant"
      });
      requestUpdate();
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      show();
    };

    const observer = new ResizeObserver(requestUpdate);
    observer.observe(document.documentElement);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("wheel", show, { passive: true });
    track.addEventListener("pointerdown", onPointerDown);
    thumb.addEventListener("pointermove", onPointerMove);
    thumb.addEventListener("pointerup", onPointerUp);
    thumb.addEventListener("pointercancel", onPointerUp);
    requestUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("wheel", show);
      track.removeEventListener("pointerdown", onPointerDown);
      thumb.removeEventListener("pointermove", onPointerMove);
      thumb.removeEventListener("pointerup", onPointerUp);
      thumb.removeEventListener("pointercancel", onPointerUp);
      window.clearTimeout(hideTimeout);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="sp-page-scrollbar" ref={trackRef} data-no-scroll aria-hidden="true">
      <div className="sp-page-scrollbar-thumb" ref={thumbRef} />
    </div>
  );
}
