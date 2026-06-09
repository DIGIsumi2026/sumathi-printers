import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { imageAssets } from "../../../data/imageAssets";

const PROJECT_SLIDE_DURATION = 4600;

const projects = [
  {
    title: "School Books Printing",
    shortTitle: "School Books",
    category: "Educational Publications",
    description:
      "High-volume school book printing with sharp colour, clean binding and reliable delivery for educational requirements.",
    image: imageAssets.projects.schoolBooks
  },
  {
    title: "Health Cards Print",
    shortTitle: "Health Cards",
    category: "Secure Card Printing",
    description:
      "Confidential health card printing with accurate finishing, controlled handling and consistent production quality.",
    image: imageAssets.projects.healthCards
  },
  {
    title: "Exam Papers",
    shortTitle: "Exam Papers",
    category: "Confidential Printing",
    description:
      "Secure exam paper production focused on privacy, accuracy, schedule control and disciplined quality assurance.",
    image: imageAssets.projects.examPapers
  },
  {
    title: "Leaflets Printing",
    shortTitle: "Leaflets",
    category: "Promotional Printing",
    description:
      "Vibrant leaflet printing for campaigns, events and business promotions with fast, colour-accurate output.",
    image: imageAssets.projects.leaflets
  },
  {
    title: "T-Shirt Printing",
    shortTitle: "T-Shirts",
    category: "Garment Printing",
    description:
      "Custom T-shirt printing with vivid colour output, careful finishing and professional quality inspection.",
    image: imageAssets.projects.tshirtPrinting
  }
];

export default function HomeProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const activeIndexRef = useRef(0);

  const activeProject = projects[activeIndex];

  const previewProjects = useMemo(() => {
    return [1, 2, 3].map((offset) => {
      const index = (activeIndex + offset) % projects.length;

      return {
        ...projects[index],
        index
      };
    });
  }, [activeIndex]);

  const goToProject = useCallback(
    (index: number) => {
      const normalizedIndex = (index + projects.length) % projects.length;

      setDirection(normalizedIndex > activeIndexRef.current ? 1 : -1);
      activeIndexRef.current = normalizedIndex;
      setActiveIndex(normalizedIndex);
    },
    []
  );

  const goNext = useCallback(() => {
    setDirection(1);

    setActiveIndex((current) => {
      const nextIndex = (current + 1) % projects.length;
      activeIndexRef.current = nextIndex;
      return nextIndex;
    });
  }, []);

  const goPrevious = () => {
    setDirection(-1);

    setActiveIndex((current) => {
      const nextIndex = current === 0 ? projects.length - 1 : current - 1;
      activeIndexRef.current = nextIndex;
      return nextIndex;
    });
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      goNext();
    }, PROJECT_SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, [goNext, isPaused]);

  return (
    <section id="home-projects" className="sp-home-projects-section">
      <span className="sp-home-projects-watermark">PROJECT PORTFOLIO</span>

      <span className="sp-project-bg-shape sp-project-bg-shape-one" />
      <span className="sp-project-bg-shape sp-project-bg-shape-two" />
      <span className="sp-project-bg-shape sp-project-bg-shape-three" />
      <span className="sp-project-bg-ring sp-project-bg-ring-one" />

      <div className="container sp-home-projects-container">
        <motion.div
          className="sp-home-projects-header"
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-home-projects-badge">
            <Sparkles size={15} />
            <span>Project Gallery</span>
          </div>

          <h2 className="sp-home-projects-title">
            Selected Printing Projects Delivered With Precision
          </h2>

          <p className="sp-home-projects-text">
            A focused look at key printing work across education, healthcare,
            confidential documents and promotional materials.
          </p>
        </motion.div>

        <motion.div
          className="sp-project-gallery-shell"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="sp-project-main-area">
            <div className="sp-project-main-card">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeProject.title}
                  className="sp-project-main-image-wrap"
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 80 : -80,
                    scale: 0.94,
                    filter: "blur(14px)"
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    filter: "blur(0px)"
                  }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -70 : 70,
                    scale: 1.04,
                    filter: "blur(14px)"
                  }}
                  transition={{
                    duration: 0.68,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    draggable={false}
                  />

                  <div className="sp-project-main-overlay" />

                  <motion.div
                    className="sp-project-main-caption"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.48,
                      delay: 0.12,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <span>{activeProject.category}</span>
                    <h3>{activeProject.title}</h3>
                    <p>{activeProject.description}</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div
                className="sp-project-progress"
                style={
                  {
                    "--project-duration": `${PROJECT_SLIDE_DURATION}ms`
                  } as React.CSSProperties
                }
              >
                <span key={activeIndex} />
              </div>
            </div>

            <div className="sp-project-gallery-actions">
              <div className="sp-project-arrows">
                <button type="button" aria-label="Previous project" onClick={goPrevious}>
                  <ChevronLeft size={22} />
                </button>

                <span />

                <button type="button" aria-label="Next project" onClick={goNext}>
                  <ChevronRight size={22} />
                </button>
              </div>

              <Link to="/projects" className="sp-project-see-more">
                <span>See More Projects</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="sp-project-preview-area">
            <div className="sp-project-preview-stack">
              {previewProjects.map((project, previewIndex) => (
                <button
                  key={project.title}
                  type="button"
                  className={`sp-project-preview-card sp-project-preview-card-${
                    previewIndex + 1
                  }`}
                  onClick={() => goToProject(project.index)}
                >
                  <img src={project.image} alt={project.title} draggable={false} />

                  <span>
                    <small>{String(project.index + 1).padStart(2, "0")}</small>
                    {project.shortTitle}
                  </span>
                </button>
              ))}
            </div>

            <div className="sp-project-current-meta">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <strong>{activeProject.shortTitle}</strong>
              <small>{activeProject.category}</small>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}