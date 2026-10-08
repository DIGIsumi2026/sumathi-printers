import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import "./LogoLoop.css";

type LogoItem = { src: string; alt: string };
type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  ariaLabel?: string;
};

const wrap = (value: number, size: number) => ((value % size) + size) % size;

export default function LogoLoop({
  logos, speed = 55, direction = "left", logoHeight = 90, gap = 64,
  hoverSpeed = 0, scaleOnHover = false, fadeOut = false,
  ariaLabel = "Company logos"
}: LogoLoopProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const sequenceWidthRef = useRef(0);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);
  const dragRef = useRef<{ pointerId: number; x: number } | null>(null);
  const [copies, setCopies] = useState(2);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const moveBy = (distance: number) => {
    if (!sequenceWidthRef.current || !trackRef.current) return;
    offsetRef.current = wrap(offsetRef.current + distance, sequenceWidthRef.current);
    trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  };

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    const track = trackRef.current;
    if (!viewport || !list || !track) return;

    const measure = () => {
      const width = list.getBoundingClientRect().width;
      sequenceWidthRef.current = width;
      if (width > 0) {
        offsetRef.current = wrap(offsetRef.current, width);
        setCopies(reducedMotion ? 1 : Math.max(2, Math.ceil(viewport.clientWidth / width) + 2));
        track.style.transform = reducedMotion ? "" : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(list);
    measure();
    return () => observer.disconnect();
  }, [logos, gap, logoHeight, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let frame = 0;
    let lastTime: number | null = null;
    let velocity = 0;
    let visible = false;
    let disposed = false;

    const tick = (time: number) => {
      const dt = lastTime === null ? 0 : Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const target = focusedRef.current || dragRef.current ? 0 : hoveredRef.current ? hoverSpeed : speed;
      velocity += (target - velocity) * (1 - Math.exp(-dt / 0.18));
      const width = sequenceWidthRef.current;
      if (!dragRef.current && width > 0) {
        offsetRef.current = wrap(offsetRef.current + velocity * dt * (direction === "left" ? 1 : -1), width);
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      lastTime = null;
      if (visible && !document.hidden && !disposed) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(viewport);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [speed, direction, hoverSpeed, reducedMotion]);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    focusedRef.current = false;
    dragRef.current = { pointerId: event.pointerId, x: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const drag = (event: PointerEvent<HTMLDivElement>) => {
    const current = dragRef.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const distance = current.x - event.clientX;
    current.x = event.clientX;
    if (reducedMotion) event.currentTarget.scrollLeft += distance;
    else moveBy(distance);
  };
  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    // Pointer capture suppresses enter/leave events while dragging.
    hoveredRef.current = event.pointerType === "mouse" &&
      event.currentTarget.matches(":hover");
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    focusedRef.current = true;
    const distance = event.key === "ArrowRight" ? 180 : -180;
    if (reducedMotion) event.currentTarget.scrollLeft += distance;
    else moveBy(distance);
  };

  const style = {
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`
  } as CSSProperties;

  return (
    <div
      ref={viewportRef}
      className={`logoloop${fadeOut ? " logoloop--fade" : ""}${scaleOnHover ? " logoloop--scale-hover" : ""}${dragging ? " is-dragging" : ""}${reducedMotion ? " logoloop--reduced" : ""}`}
      style={style}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") hoveredRef.current = true; }}
      onPointerLeave={() => { hoveredRef.current = false; }}
      onFocus={(event) => { focusedRef.current = event.currentTarget.matches(":focus-visible"); }}
      onBlur={() => { focusedRef.current = false; }}
      onKeyDown={handleKeyDown}
      onPointerDown={startDrag}
      onPointerMove={drag}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onLostPointerCapture={stopDrag}
    >
      <div ref={trackRef} className="logoloop__track">
        {Array.from({ length: copies }, (_, copy) => (
          <ul key={copy} ref={copy === 0 ? listRef : undefined} className="logoloop__list" aria-hidden={copy !== 0 || undefined}>
            {logos.map((logo, index) => (
              <li key={`${logo.src}-${index}`} className="logoloop__item">
                <img src={logo.src} alt={copy === 0 ? logo.alt : ""} draggable={false} decoding="async" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
