import { Scissors, FileText, BookOpen, Layers, Hash, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CompanyData } from '../../../types/site';
import SectionHeader from '../../../components/common/SectionHeader';

const finishingIcons = [Scissors, FileText, BookOpen, Layers, Hash, Sparkles];

type FinishingServicesSectionProps = {
  company: CompanyData;
};

export default function FinishingServicesSection({ company }: FinishingServicesSectionProps) {
  return (
    <section id="finishing" className="finishing-section section-pale pattern-bg">
      <SectionHeader
        badgeLeft="Finishing Services"
        badgeRight="Final Production Quality"
        title="Professional Finishing Services For A Polished Result"
        text="From trimming and folding to lamination, binding and numbering, our finishing process gives print work a complete professional presentation."
        centered
      />

      <div className="container finishing-grid">
        {company.finishingServices.map((service, index) => {
          const Icon = finishingIcons[index % finishingIcons.length];

          return (
            <motion.article
              className="finishing-card"
              key={service}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.055 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <span className="finishing-corner" />
              <Icon size={30} />
              <h3>{service}</h3>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
