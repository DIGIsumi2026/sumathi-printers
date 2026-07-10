import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { imageAssets } from "../../../data/imageAssets";

const categories = [
  {
    title: "Corporate Publications & Books",
    caption: "Books, reports, magazines",
    image: imageAssets.projectsPage.corporatePublications,
    description:
      "Delivering crisp typography, flawless image reproduction, and premium binding for magazines, annual reports, and corporate books."
  },
  {
    title: "Packaging Solutions",
    caption: "Boxes, cartons, finishing",
    image: imageAssets.projectsPage.packagingSolutions,
    description:
      "Durable and structurally precise packaging boxes, expertly cut and finished with UV varnishing, laminating, and foiling."
  },
  {
    title: "Marketing & Promotional Collateral",
    caption: "Flyers, brochures, posters",
    image: imageAssets.projectsPage.marketingCollateral,
    description:
      "Vibrant flyers, brochures, posters, and catalogs engineered for high-impact visibility and audience engagement."
  },
  {
    title: "Official Stationery & Secure Printing",
    caption: "Certificates, bill books, forms",
    image: imageAssets.projectsPage.securePrinting,
    description:
      "Sophisticated bill books, envelopes, letterheads, and secure certificate printing with foiling and numbering."
  }
];

export default function ProjectsCategoriesSection() {
  return (
    <section id="project-categories" className="sp-projects-categories-section" data-watermark-section>
      <span className="sp-projects-categories-watermark" data-section-watermark>PROJECTS</span>

      <span className="sp-projects-categories-orb sp-projects-categories-orb-one" />
      <span className="sp-projects-categories-orb sp-projects-categories-orb-two" />
      <span className="sp-projects-categories-ring sp-projects-categories-ring-one" />
      <span className="sp-projects-categories-ring sp-projects-categories-ring-two" />
      <span className="sp-projects-categories-shape sp-projects-categories-shape-one" />
      <span className="sp-projects-categories-shape sp-projects-categories-shape-two" />

      <div className="container sp-projects-categories-container">
        <div className="sp-projects-categories-header">
          <div className="sp-projects-categories-badge">
            <Sparkles size={15} />
            <span>Featured Project Categories</span>
          </div>

          <h2>Print Projects Built With Precision</h2>

          <p>
            Our portfolio covers publication printing, packaging, promotional
            material, stationery, and secure document printing for institutions
            and businesses across Sri Lanka.
          </p>
        </div>

        <div className="sp-projects-category-grid">
          {categories.map((category, index) => (
            <motion.article
              key={category.title}
              className="sp-projects-category-card"
              initial={{ opacity: 0, y: 42, scale: 0.96, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{
                duration: 0.72,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <img
                src={category.image}
                alt={category.title}
                draggable={false}
                loading="lazy"
                decoding="async"
              />

              <div className="sp-projects-category-overlay" />
              <div className="sp-projects-category-bottom-fade" />

              <div className="sp-projects-category-content">
                <span className="sp-projects-category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="sp-projects-category-info">
                  <span>{category.caption}</span>
                  <h3>{category.title}</h3>

                  <div className="sp-projects-category-hover">
                    <p>{category.description}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
