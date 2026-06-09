import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { imageAssets } from "../../../data/imageAssets";

const clients = [
  { name: "Ministry Of Health", logo: imageAssets.clients.client01 },
  { name: "Rupawahini", logo: imageAssets.clients.client02 },
  { name: "Family Health Bureau", logo: imageAssets.clients.client03 },
  { name: "Health Promotional Bureau", logo: imageAssets.clients.client04 },
  { name: "BCC", logo: imageAssets.clients.client05 },
  { name: "University of Sri Jayawarhdanapura", logo: imageAssets.clients.client06 },
  { name: "University of Colombo", logo: imageAssets.clients.client07 },
  { name: "N.A.I.T.A", logo: imageAssets.clients.client08 },
  { name: "Revenue Department of Sri Lanka", logo: imageAssets.clients.client09 },
  { name: "RDB Bank", logo: imageAssets.clients.client10 },
  { name: "Sri Lanka Insurance", logo: imageAssets.clients.client11 },
  { name: "National Savings Bank", logo: imageAssets.clients.client12 },
  { name: "National Water Supply and Drainage Board", logo: imageAssets.clients.client13 },
  { name: "Colombo Textiles", logo: imageAssets.clients.client14 },
  { name: "National Cancer Control Programme", logo: imageAssets.clients.client15 }
];

export default function HomeClientsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateActiveLogo = () => {
    const scroller = scrollRef.current;

    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>(".sp-client-logo-card")
    );

    const scrollerRect = scroller.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(scrollerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToLogo = (index: number) => {
    const scroller = scrollRef.current;

    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>(".sp-client-logo-card")
    );

    const targetCard = cards[index];

    if (!targetCard) return;

    const targetLeft =
      targetCard.offsetLeft -
      scroller.clientWidth / 2 +
      targetCard.clientWidth / 2;

    scroller.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });

    setActiveIndex(index);
  };

  const goPrevious = () => {
    const nextIndex = activeIndex === 0 ? clients.length - 1 : activeIndex - 1;
    scrollToLogo(nextIndex);
  };

  const goNext = () => {
    const nextIndex = activeIndex === clients.length - 1 ? 0 : activeIndex + 1;
    scrollToLogo(nextIndex);
  };

  useEffect(() => {
    const scroller = scrollRef.current;

    if (!scroller) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      scroller.scrollLeft += event.deltaY;
      window.requestAnimationFrame(updateActiveLogo);
    };

    const handleScroll = () => {
      window.requestAnimationFrame(updateActiveLogo);
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    scroller.addEventListener("scroll", handleScroll, { passive: true });

    updateActiveLogo();

    return () => {
      scroller.removeEventListener("wheel", handleWheel);
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const scroller = scrollRef.current;

    if (!scroller) return;

    setIsDragging(true);

    const startX = event.pageX - scroller.offsetLeft;
    const startScrollLeft = scroller.scrollLeft;

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const x = moveEvent.pageX - scroller.offsetLeft;
      const distance = (x - startX) * 1.35;

      scroller.scrollLeft = startScrollLeft - distance;
      updateActiveLogo();
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <section id="clients" className="sp-home-clients-section">
      <span className="sp-client-bg-shape sp-client-bg-shape-one" />
      <span className="sp-client-bg-shape sp-client-bg-shape-two" />
      <span className="sp-client-bg-shape sp-client-bg-shape-three" />
      <span className="sp-client-bg-ring sp-client-bg-ring-one" />
      <span className="sp-client-bg-ring sp-client-bg-ring-two" />

      <span className="sp-home-clients-watermark">CLIENTS</span>

      <div className="container sp-home-clients-container">
        <motion.div
          className="sp-home-clients-header"
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-home-clients-badge">
            <Sparkles size={15} />
            <span>Trusted Clients</span>
          </div>

          <h2 className="sp-home-clients-title">
            Trusted By Businesses, Institutions And Publishers
          </h2>

          <p className="sp-home-clients-text">
            We support clients across commercial, educational, institutional and
            publishing sectors with dependable printing, finishing and packaging
            services.
          </p>
        </motion.div>

        <motion.div
          className="sp-client-floating-panel"
          initial={{ opacity: 0, y: 46, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-client-panel-head">
            <div>
              <strong>Client Portfolio</strong>
            </div>

            <div className="sp-client-arrows">
              <button type="button" aria-label="Previous client" onClick={goPrevious}>
                <ChevronLeft size={21} />
              </button>

              <span className="sp-client-arrow-line" />

              <button type="button" aria-label="Next client" onClick={goNext}>
                <ChevronRight size={21} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className={`sp-client-logo-scroll ${isDragging ? "is-dragging" : ""}`}
            onMouseDown={handleMouseDown}
          >
            {clients.map((client, index) => (
              <article
                key={client.name}
                className={`sp-client-logo-card ${
                  index === activeIndex ? "is-active" : ""
                }`}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="sp-client-logo-img"
                  draggable={false}
                />

                <span>{client.name}</span>

                <small>{String(index + 1).padStart(2, "0")}</small>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}