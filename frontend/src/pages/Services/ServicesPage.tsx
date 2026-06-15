import type { CompanyData } from "../../types/site";
import ServicesHeroSection from "./sections/ServicesHeroSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import ServicesGridSection from "./sections/ServicesGridSection";
import FinishingServicesSection from "./sections/FinishingServicesSection";
import ServicesCtaSection from "./sections/ServicesCtaSection";

type ServicesPageProps = {
  company: CompanyData;
};

export default function ServicesPage({ company }: ServicesPageProps) {
  return (
    <main className="sp-inner-page">
      <ServicesHeroSection/>
      <WhyChooseUsSection/>
      <ServicesGridSection/>
      <FinishingServicesSection/>
      <ServicesCtaSection/>
      
    </main>
  );
}