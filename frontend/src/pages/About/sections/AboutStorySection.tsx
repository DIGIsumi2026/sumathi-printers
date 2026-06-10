import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { imageAssets } from "../../../data/imageAssets";

export default function AboutStorySection() {
  return (
    <section className="sp-about-story-section">
      <span className="sp-about-story-watermark">ABOUT US</span>

      <span className="sp-about-story-shape sp-about-story-shape-one" />
      <span className="sp-about-story-shape sp-about-story-shape-two" />

      <div className="container sp-about-story-container">
        <motion.div
          className="sp-about-story-content"
          initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-about-story-badge">
            <Sparkles size={15} />
            <span>About Us</span>
          </div>

          <h2>Rooted In Publishing, Built For Modern Printing</h2>

          <div className="sp-about-story-text">
            <p>
              <strong>Sumathi Publishers</strong>, a partnership established in
              1984, was the forerunner to Sumathi Book Printing (Pvt) Ltd,
              which was incorporated in 1991.
            </p>

            <p>
              It was later renamed as <strong>Sumathi Printers (Pvt) Ltd</strong>{" "}
              in 2011, operating as a subsidiary of Sumathi Global Consolidated
              (Pvt) Ltd.
            </p>

            <p>
              The company has proudly been at the forefront of the printing and
              publishing industry in Sri Lanka for several decades.
            </p>
          </div>

          <div className="sp-about-story-years">
            <span>
              <strong>1984</strong>
              Established
            </span>

            <span>
              <strong>1991</strong>
              Incorporated
            </span>

            <span>
              <strong>2011</strong>
              Renamed
            </span>
          </div>
        </motion.div>

        <motion.div
          className="sp-about-story-image-wrap"
          initial={{ opacity: 0, x: 50, scale: 0.94, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-about-story-image-card">
            <img
              src={imageAssets.about.story}
              alt="Sumathi Printers Sri Lankan printing team"
              draggable={false}
            />

            <div className="sp-about-story-image-overlay" />

            <div className="sp-about-story-image-caption">
              <span>Since 1984</span>
              <strong>Printing & Publishing Excellence</strong>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}