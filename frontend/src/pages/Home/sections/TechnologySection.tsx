import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Cpu, Sparkles } from "lucide-react";
import { imageAssets } from "../../../data/imageAssets";

const SLIDE_DURATION = 3800;

const technologySlides = [
  {
    title: "Offset Colour Lithography",
    subtitle: "Precision press technology",
    image: imageAssets.technology.printing
  },
  {
    title: "Book Binding Systems",
    subtitle: "Perfect, wire, spiral and hard case binding",
    image: imageAssets.technology.binding
  },
  {
    title: "Packaging & Shrink Wrapping",
    subtitle: "Reliable finishing and protection",
    image: imageAssets.technology.packaging
  },
  {
    title: "UV, Foiling & Lamination",
    subtitle: "Premium print finishing technology",
    image: imageAssets.technology.finishing
  }
];

const technologyPoints = [
  "Modern electronic photo typesetting capabilities",
  "Offset colour lithography and premium finishing",
  "Confidential, scheduled and quality-focused production"
];

export default function TechnologySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % technologySlides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, []);

  const activeSlide = technologySlides[activeIndex];

  return (
    <section id="technology" className="sp-technology-section">
      <span className="sp-technology-watermark">TECHNOLOGY</span>

      <div className="container sp-technology-container">
        <motion.div
          className="sp-technology-image-column"
          initial={{ opacity: 0, scale: 0.82, y: 64 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="sp-technology-image-frame"
            style={{ "--tech-duration": `${SLIDE_DURATION}ms` } as React.CSSProperties}
          >
            <div className="sp-technology-progress sp-technology-progress-top" />
            <div className="sp-technology-progress sp-technology-progress-right" />
            <div className="sp-technology-progress sp-technology-progress-bottom" />
            <div className="sp-technology-progress sp-technology-progress-left" />

            <AnimatePresence mode="wait">
              <motion.img
                key={activeSlide.title}
                src={activeSlide.image}
                alt={activeSlide.title}
                className="sp-technology-image"
                initial={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            <div className="sp-technology-image-overlay" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSlide.title}-caption`}
                className="sp-technology-slide-caption"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <span>{activeSlide.subtitle}</span>
                <strong>{activeSlide.title}</strong>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="sp-technology-dots">
            {technologySlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={index === activeIndex ? "is-active" : ""}
                aria-label={`Show ${slide.title}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="sp-technology-content"
          initial={{ opacity: 0, x: 54, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-technology-badge">
            <Sparkles size={15} />
            <span>Technology & Production</span>
          </div>

          <h2 className="sp-technology-title">
            State Of The Art Machinery For Demanding Print Standards
          </h2>

          <p className="sp-technology-text">
            Our press is equipped with advanced machinery, modern technology and
            specialised accessories operated by qualified production personnel.
            This combination allows us to meet demanding local and international
            print requirements with consistency, confidentiality and dependable
            turnaround times.
          </p>

          <p className="sp-technology-text">
            The facility supports modern electronic photo typesetting, offset
            colour lithography, UV varnishing, gold foiling, lamination, hard
            case binding, perfect binding, wire binding, spiral binding and
            shrink wrapping. Every process is focused on delivering quality work
            at competitive value while maintaining strict schedules.
          </p>

          <div className="sp-technology-points">
            {technologyPoints.map((point) => (
              <span key={point}>
                <CheckCircle2 size={16} />
                {point}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}