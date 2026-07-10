import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";

const clients = [
  "Ministry of Health",
  "Health Promotion Bureau",
  "Inland Revenue Department",
  "Sri Lanka Rupawahini Corporation",
  "University of Colombo",
  "Sri Lanka Insurance",
  "National Savings Bank",
  "Regional Development Bank",
  "Colombo Textiles Group",
  "Cancer Control Programme",
  "BCC",
  "NAITA"
];

export default function ProjectsClientsSection() {
  const marqueeClients = [...clients, ...clients];

  return (
    <section className="sp-projects-clients-section" data-watermark-section>
      <img
        src={imageAssets.projectsPage.clientsBackground}
        alt="Trusted clients background"
        className="sp-projects-clients-bg"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      <div className="sp-projects-clients-overlay" />
      <div className="sp-projects-clients-grid-bg" />

      <span className="sp-projects-clients-watermark" data-section-watermark>TRUSTED</span>

      <div className="container sp-projects-clients-container">
        <motion.div
          className="sp-projects-clients-header"
          initial={{ opacity: 0, x: -42, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-projects-clients-badge">
            <Sparkles size={15} />
            <span>Our Trusted Clients</span>
          </div>

          <h2 className="sp-section-heading">Trusted by Sri Lanka’s Leading Institutions</h2>

          <p>
            We are proud to be the chosen printing partner for major government
            bodies, financial institutions, and leading corporate enterprises.
          </p>
        </motion.div>

        <div className="sp-projects-clients-marquee">
          <div className="sp-projects-clients-track">
            {marqueeClients.map((client, index) => (
              <span key={`${client}-${index}`}>{client}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
