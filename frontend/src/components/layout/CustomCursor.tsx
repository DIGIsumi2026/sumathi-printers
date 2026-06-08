import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!isFinePointer) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let followerX = mouseX;
    let followerY = mouseY;

    let animationFrame = 0;

    const interactiveSelector = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "[role='button']",
      "[data-cursor='hover']",
      ".sp-nav-link",
      ".sp-quote-button",
      ".sp-mobile-toggle",
      ".sp-animated-btn",
      ".sp-hero-progress-segment"
    ].join(",");

    const textSelector = ["input", "textarea", "[contenteditable='true']"].join(",");

    const updateCursor = () => {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;

      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

      animationFrame = window.requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const target = event.target as HTMLElement | null;

      const isInteractive = Boolean(target?.closest(interactiveSelector));
      const isText = Boolean(target?.closest(textSelector));

      document.body.classList.toggle("cursor-hovering", isInteractive);
      document.body.classList.toggle("cursor-text", isText);
    };

    const handleMouseDown = () => {
      document.body.classList.add("cursor-clicking");
    };

    const handleMouseUp = () => {
      document.body.classList.remove("cursor-clicking");
    };

    const handleMouseLeave = () => {
      document.body.classList.add("cursor-hidden");
    };

    const handleMouseEnter = () => {
      document.body.classList.remove("cursor-hidden");
    };

    animationFrame = window.requestAnimationFrame(updateCursor);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      document.body.classList.remove(
        "cursor-hovering",
        "cursor-clicking",
        "cursor-hidden",
        "cursor-text"
      );
    };
  }, []);

  return (
    <>
      <div ref={followerRef} className="custom-cursor-follower" />
      <div ref={cursorRef} className="custom-cursor-dot" />
    </>
  );
}