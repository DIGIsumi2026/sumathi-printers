import { Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CompanyData } from '../../../types/site';
import SectionHeader from '../../../components/common/SectionHeader';

type ClientsSectionProps = {
  company: CompanyData;
};

export default function ClientsSection({ company }: ClientsSectionProps) {
  return (
    <section id="clients" className="clients-section section-white">
      <SectionHeader
        badgeLeft="Clients"
        badgeRight="Trusted By Institutions"
        title="Trusted Printing Partner For Public And Private Sector Clients"
        text="The company profile highlights a client base across government, education, financial, insurance and commercial sectors."
      />

      <div className="container client-grid">
        {company.clients.map((client, index) => (
          <motion.article
            className="client-card"
            key={client}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ delay: index * 0.035, duration: 0.48 }}
            whileHover={{ y: -5, scale: 1.015 }}
          >
            <span><Building2 size={24} /></span>
            <strong>{client}</strong>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
