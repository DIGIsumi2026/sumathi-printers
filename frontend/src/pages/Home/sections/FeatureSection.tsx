import { Award, Cog, Truck } from 'lucide-react';
import type { CompanyData } from '../../../types/site';
import Reveal from '../../../components/common/Reveal';

const icons = [Award, Cog, Truck];

type FeatureSectionProps = {
  company: CompanyData;
};

export default function FeatureSection({ company }: FeatureSectionProps) {
  return (
    <section className="feature-section section-pale">
      <div className="container feature-grid">
        {company.features.map((feature, index) => {
          const Icon = icons[index] || Award;

          return (
            <Reveal as="article" className="feature-card" delay={index * 0.1} key={feature.title}>
              <span className="feature-icon"><Icon size={26} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
