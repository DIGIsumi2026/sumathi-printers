import { motion } from "framer-motion";
import { Lightbulb, ShieldCheck, Sparkles, Target } from "lucide-react";
import { imageAssets } from "../../../data/imageAssets";

export default function AboutVisionMissionSection() {
  return (
    <section className="sp-about-vm-wrapper">
      <section className="sp-about-vm-section sp-about-vm-vision">
        <span className="sp-about-vm-watermark">VISION</span>

        <div className="container sp-about-vm-container">
          <motion.div
            className="sp-about-vm-grid sp-about-vm-grid-vision"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.38 }}
          >
            <motion.div
              className="sp-about-vm-image-wrap"
              variants={{
                hidden: {
                  opacity: 0,
                  x: -80,
                  scale: 0.88,
                  rotate: -2,
                  filter: "blur(14px)"
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  rotate: 0,
                  filter: "blur(0px)"
                }
              }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sp-about-vm-image-card">
                <img
                  src={imageAssets.about.vision}
                  alt="Sumathi Printers vision"
                  draggable={false}
                />

                <div className="sp-about-vm-image-overlay" />

                <div className="sp-about-vm-image-badge">
                  <Lightbulb size={16} />
                  <span>Quality & Service Excellence</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="sp-about-vm-text-card sp-about-vm-text-vision"
              variants={{
                hidden: {
                  opacity: 0,
                  x: -230,
                  scale: 0.94,
                  filter: "blur(16px)"
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)"
                }
              }}
              transition={{
                duration: 0.92,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="sp-about-vm-kicker">
                <Sparkles size={15} />
                <span>Our Vision</span>
              </div>

              <h2>To Lead With Quality, Integrity And Innovation</h2>

              <p>
                To be a key player in the printing industry in the pursuit of
                quality and service excellence, while earning the enthusiasm of
                our employees and customers through continuous improvement
                driven by integrity, teamwork and innovation.
              </p>

              <div className="sp-about-vm-points">
                <span>
                  <ShieldCheck size={16} />
                  Integrity
                </span>

                <span>
                  <Target size={16} />
                  Quality
                </span>

                <span>
                  <Lightbulb size={16} />
                  Innovation
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="sp-about-vm-section sp-about-vm-mission">
        <span className="sp-about-vm-watermark">MISSION</span>

        <div className="container sp-about-vm-container">
          <motion.div
            className="sp-about-vm-grid sp-about-vm-grid-mission"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.38 }}
          >
            <motion.div
              className="sp-about-vm-text-card sp-about-vm-text-mission"
              variants={{
                hidden: {
                  opacity: 0,
                  x: 230,
                  scale: 0.94,
                  filter: "blur(16px)"
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)"
                }
              }}
              transition={{
                duration: 0.92,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="sp-about-vm-kicker">
                <Sparkles size={15} />
                <span>Our Mission</span>
              </div>

              <h2>Comprehensive Printing Solutions With Lasting Value</h2>

              <p>
                We are committed to providing comprehensive printing solutions
                dedicated to excellence in customer service, product quality and
                responsible impact within the environment, local community and
                our staff.
              </p>

              <p>
                We aim to provide the very best in everything we do for the
                benefit of our staff, customers and suppliers, while ensuring
                sustainable and profitable growth.
              </p>

              <div className="sp-about-vm-points">
                <span>
                  <Target size={16} />
                  Service
                </span>

                <span>
                  <ShieldCheck size={16} />
                  Responsibility
                </span>

                <span>
                  <Lightbulb size={16} />
                  Growth
                </span>
              </div>
            </motion.div>

            <motion.div
              className="sp-about-vm-image-wrap"
              variants={{
                hidden: {
                  opacity: 0,
                  x: 80,
                  scale: 0.88,
                  rotate: 2,
                  filter: "blur(14px)"
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  rotate: 0,
                  filter: "blur(0px)"
                }
              }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sp-about-vm-image-card">
                <img
                  src={imageAssets.about.mission}
                  alt="Sumathi Printers mission"
                  draggable={false}
                />

                <div className="sp-about-vm-image-overlay" />

                <div className="sp-about-vm-image-badge">
                  <Target size={16} />
                  <span>Customer, Community & Staff</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </section>
  );
}