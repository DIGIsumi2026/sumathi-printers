import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import LogoLoop from "../../../components/common/LogoLoop";
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

const clientLogos = clients.map(({ name, logo }) => ({ src: logo, alt: name }));

export default function HomeClientsSection() {
  return (
    <section id="clients" className="sp-home-clients-section" data-watermark-section>
      <span className="sp-home-clients-watermark" data-section-watermark>CLIENTS</span>

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

          <h2 className="sp-section-heading sp-home-clients-title">
            Trusted By Businesses, Institutions And Publishers
          </h2>

          <p className="sp-home-clients-text">
            We support clients across commercial, educational, institutional and
            publishing sectors with dependable printing, finishing and packaging
            services.
          </p>
        </motion.div>

        <div className="sp-home-clients-portfolio">

          <LogoLoop
            logos={clientLogos}
            speed={55}
            direction="left"
            logoHeight={104}
            gap={64}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="Client Portfolio"
          />
        </div>
      </div>
    </section>
  );
}
