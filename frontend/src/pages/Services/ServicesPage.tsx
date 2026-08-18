import type { CompanyData } from "../../types/site";
import SEO from "../../components/common/SEO";

import ServicesHeroSection from "./sections/ServicesHeroSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import ServicesGridSection from "./sections/ServicesGridSection";
import FinishingServicesSection from "./sections/FinishingServicesSection";
import ServicesCtaSection from "./sections/ServicesCtaSection";

const SITE_URL = "https://www.sumathiprinters.lk";

type ServicesPageProps = {
  company: CompanyData;
};

export default function ServicesPage({ company }: ServicesPageProps) {
  return (
    <>
      <SEO
        title="Printing Services | Sumathi Printers Sri Lanka"
        description="Explore our full range of professional printing services – offset printing, digital printing, book printing, packaging, brochures, business cards, finishing services and more."
        canonical={`${SITE_URL}/services`}
        keywords="offset printing, digital printing, book printing, packaging printing, brochure printing, business cards, finishing services, Sri Lanka"
      />
      <main className="sp-inner-page">
        <ServicesHeroSection />
        <WhyChooseUsSection />
        <ServicesGridSection />
        <FinishingServicesSection />
        <ServicesCtaSection />
      </main>
    </>
  );
}