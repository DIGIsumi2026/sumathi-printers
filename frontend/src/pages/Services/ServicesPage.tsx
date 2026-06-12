import type { CompanyData } from "../../types/site";
import ServicesHeroSection from "./sections/ServicesHeroSection";
import WhyChooseUsSection from "./sections/WhyChooseUsSection";
import ServicesGridSection from "./sections/ServicesGridSection";
type ServicesPageProps = {
  company: CompanyData;
};

export default function ServicesPage({ company }: ServicesPageProps) {
  return (
    <main className="sp-inner-page">
      <ServicesHeroSection/>
      <WhyChooseUsSection/>
      <ServicesGridSection/>
      {/*
      <section className="container sp-inner-page-hero">
        <span className="sp-inner-page-kicker">Services</span>
        <h1>Complete Printing Services</h1>
        <p>
          Explore the full range of printing, publishing, packaging, stationery
          and finishing services offered by {company.brand}.
        </p>
      </section>
      */}
    </main>
  );
}