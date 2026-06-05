import type { CompanyData } from '../../../types/site';
import Reveal from '../../../components/common/Reveal';

type PartnersSectionProps = {
  company: CompanyData;
};

export default function PartnersSection({ company }: PartnersSectionProps) {
  return (
    <section className="partners-section section-pale">
      <Reveal className="container partners-wrap">
        <p>We Proudly Collaborate With Trusted Clients & Partners</p>
        <div className="partner-logos">
          {company.partners.map((partner) => <span key={partner}>{partner}</span>)}
        </div>
      </Reveal>
    </section>
  );
}
