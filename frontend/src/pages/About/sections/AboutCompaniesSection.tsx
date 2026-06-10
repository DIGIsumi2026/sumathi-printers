import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";

const AUTO_SLIDE_DURATION = 2800;

const companies = [
  {
    name: "Company 01",
    logo: imageAssets.companies.company01
  },
  {
    name: "Company 02",
    logo: imageAssets.companies.company02
  },
  {
    name: "Company 03",
    logo: imageAssets.companies.company03
  },
  {
    name: "Company 04",
    logo: imageAssets.companies.company04
  },
  {
    name: "Company 05",
    logo: imageAssets.companies.company05
  },
  {
    name: "Company 06",
    logo: imageAssets.companies.company06
  },
  {
    name: "Company 07",
    logo: imageAssets.companies.company07
  },
  {
    name: "Company 08",
    logo: imageAssets.companies.company08
  },
  {
    name: "Company 09",
    logo: imageAssets.companies.company09
  },
  {
    name: "Company 10",
    logo: imageAssets.companies.company10
  },
  {
    name: "Company 11",
    logo: imageAssets.companies.company11
  },
  {
    name: "Company 12",
    logo: imageAssets.companies.company12
  },
  {
    name: "Company 13",
    logo: imageAssets.companies.company13
  },
  {
    name: "Company 14",
    logo: imageAssets.companies.company14
  },
  {
    name: "Company 15",
    logo: imageAssets.companies.company15
  },
];

export default function AboutCompaniesSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const updateActiveLogo = useCallback(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const cards = Array.from(
      scrollElement.querySelectorAll<HTMLElement>(".sp-about-company-logo-card")
    );

    if (!cards.length) return;

    const scrollCenter =
      scrollElement.scrollLeft + scrollElement.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const cards = Array.from(
      scrollElement.querySelectorAll<HTMLElement>(".sp-about-company-logo-card")
    );

    const targetCard = cards[index];
    if (!targetCard) return;

    const targetLeft =
      targetCard.offsetLeft -
      scrollElement.clientWidth / 2 +
      targetCard.offsetWidth / 2;

    scrollElement.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });
  }, []);

  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % companies.length;
    scrollToIndex(nextIndex);
    setActiveIndex(nextIndex);
  }, [activeIndex, scrollToIndex]);

  const goToPrevious = useCallback(() => {
    const previousIndex =
      activeIndex === 0 ? companies.length - 1 : activeIndex - 1;

    scrollToIndex(previousIndex);
    setActiveIndex(previousIndex);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => updateActiveLogo();

    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveLogo();

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [updateActiveLogo]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = (currentIndex + 1) % companies.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, AUTO_SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, scrollToIndex]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      scrollElement.scrollLeft += event.deltaY;
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    isDraggingRef.current = true;
    startXRef.current = event.clientX;
    scrollLeftRef.current = scrollElement.scrollLeft;
    setIsPaused(true);

    scrollElement.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || !isDraggingRef.current) return;

    const distance = event.clientX - startXRef.current;
    scrollElement.scrollLeft = scrollLeftRef.current - distance;
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    isDraggingRef.current = false;
    setIsPaused(false);

    if (scrollElement.hasPointerCapture(event.pointerId)) {
      scrollElement.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="sp-about-companies-section">
      <span className="sp-about-companies-watermark">OUR COMPANIES</span>

      <span className="sp-client-bg-shape sp-client-bg-shape-one" />
      <span className="sp-client-bg-shape sp-client-bg-shape-two" />
      <span className="sp-client-bg-shape sp-client-bg-shape-three" />
      <span className="sp-client-bg-ring sp-client-bg-ring-one" />
      <span className="sp-client-bg-ring sp-client-bg-ring-two" />

      <div className="container sp-about-companies-container">
        <motion.div
          className="sp-about-companies-head"
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-about-companies-badge">
            <Sparkles size={15} />
            <span>Our Companies</span>
          </div>

          <h2>Part Of A Stronger Corporate Network</h2>

          <p>
            Sumathi Printers operates with the strength, vision and support of
            the wider Sumathi corporate network, built through decades of
            trusted business excellence.
          </p>
        </motion.div>

        <motion.div
          className="sp-client-floating-panel sp-about-companies-panel"
          initial={{ opacity: 0, y: 42, scale: 0.96, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="sp-client-panel-head">
            <div>
              <span>Corporate Group</span>
              <h3>Our Companies</h3>
            </div>

            <div className="sp-client-arrows">
              <button
                type="button"
                aria-label="Previous company"
                onClick={goToPrevious}
              >
                <ChevronLeft size={20} />
              </button>

              <span />

              <button
                type="button"
                aria-label="Next company"
                onClick={goToNext}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="sp-client-logo-scroll sp-about-company-logo-scroll"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            {companies.map((company, index) => (
              <article
                key={company.name}
                className={`sp-client-logo-card sp-about-company-logo-card ${
                  activeIndex === index ? "is-active" : ""
                }`}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="sp-client-logo-img sp-about-company-logo-img"
                  draggable={false}
                />
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}