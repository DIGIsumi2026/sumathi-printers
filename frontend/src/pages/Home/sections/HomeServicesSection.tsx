import { ArrowUpRight, BookOpen, Boxes, CalendarDays, FileBadge, FileText, Layers, Megaphone, NotebookTabs, PackageCheck, ScrollText, Sparkles, Tags } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const homeServices = [
  {
    title: "Offset Printing",
    description: "High-quality colour lithography for commercial and institutional print needs.",
    icon: Layers
  },
  {
    title: "Books & Magazines",
    description: "Professional book, magazine, catalogue and publication printing with clean finishing.",
    icon: BookOpen
  },
  {
    title: "Brochures & Catalogues",
    description: "Premium marketing materials with sharp colour, clean folds and polished presentation.",
    icon: NotebookTabs
  },
  {
    title: "Packaging Boxes",
    description: "Custom printed packaging boxes, folding cartons and product-ready printed packs.",
    icon: Boxes
  },
  {
    title: "Posters & Banners",
    description: "Large-format promotional prints with bold colour and strong visual impact.",
    icon: Megaphone
  },
  {
    title: "Flyers & Leaflets",
    description: "Affordable, sharp and professional promotional prints for campaigns and events.",
    icon: FileText
  },
  {
    title: "Stickers & Labels",
    description: "Printed stickers, product labels and adhesive materials with accurate finishing.",
    icon: Tags
  },
  {
    title: "Certificates",
    description: "Elegant certificate printing with premium paper, borders and refined presentation.",
    icon: FileBadge
  },
  {
    title: "Calendars & Diaries",
    description: "Corporate calendars, diaries and branded stationery for annual business use.",
    icon: CalendarDays
  },
  {
    title: "Letterheads & Envelopes",
    description: "Professional business stationery with clean layouts and consistent brand quality.",
    icon: ScrollText
  },
  {
    title: "Binding Services",
    description: "Perfect binding, hard case binding, wire binding and spiral binding solutions.",
    icon: PackageCheck
  },
  {
    title: "Finishing Services",
    description: "UV varnishing, gold foiling, lamination and shrink wrapping for premium output.",
    icon: Sparkles
  }
];

export default function HomeServicesSection() {
  return (
    <section id="home-services" className="sp-home-services-section">
      <span className="sp-home-services-watermark">OUR SERVICES</span>

      <div className="container sp-home-services-container">
        <motion.div
          className="sp-home-services-header"
          initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-home-services-badge">
            <Sparkles size={15} />
            <span>What We Do</span>
          </div>

          <h2 className="sp-home-services-title">
            Complete Printing Services For Every Business Need
          </h2>

          <p className="sp-home-services-intro">
            From commercial printing and publications to packaging, labels,
            stationery and finishing, Sumathi Printers delivers reliable print
            solutions with quality, speed and precision.
          </p>
        </motion.div>

        <div className="sp-home-services-grid">
          {homeServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                className="sp-home-service-card"
                initial={{ opacity: 0, y: 38, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="sp-home-service-card-glow" />

                <div className="sp-home-service-icon">
                  <Icon size={22} />
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <span className="sp-home-service-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="sp-home-services-action"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/services" className="sp-home-services-more">
            <span>See More Services</span>
            <ArrowUpRight size={18} />
        </Link>
        </motion.div>
      </div>
    </section>
  );
}