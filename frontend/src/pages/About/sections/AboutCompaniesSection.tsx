import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import LogoLoop from "../../../components/common/LogoLoop";
import { imageAssets } from "../../../data/imageAssets";
import { useGsapAboutTimeline } from "../../../lib/useGsapAnimations";

const companies = Object.entries(imageAssets.companies).map(([name, src]) => ({
  src,
  alt: `Company ${name.replace("company", "")}`
}));

export default function AboutCompaniesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useGsapAboutTimeline(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="sp-about-companies-section"
      data-gsap-about-timeline
      data-watermark-section
    >
      <span className="sp-about-companies-watermark" data-section-watermark>OUR COMPANIES</span>

      <div className="container sp-about-companies-container">
        <motion.div
          className="sp-about-companies-head"
          data-gsap-about-item
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-about-companies-badge">
            <Sparkles size={15} />
            <span>Our Companies</span>
          </div>

          <h2 className="sp-section-heading">Part Of A Stronger Corporate Network</h2>

          <p>
            Sumathi Printers operates with the strength, vision and support of
            the wider Sumathi corporate network, built through decades of
            trusted business excellence.
          </p>
        </motion.div>

        <LogoLoop
          logos={companies}
          speed={55}
          direction="left"
          logoHeight={104}
          gap={64}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel="Sumathi group companies"
        />
      </div>
    </section>
  );
}
