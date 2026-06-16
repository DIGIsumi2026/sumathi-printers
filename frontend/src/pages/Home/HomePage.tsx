import type { FormEvent } from 'react';
import type { CompanyData, FormStatus } from '../../types/site';

//sections
import HeroSection from './sections/HeroSection';
import AboutVideoSection from "./sections/AboutVideoSection";
import TechnologySection from "./sections/TechnologySection";
import ProductGallerySection from "./sections/ProductGallerySection";
import HomeServicesSection from "./sections/HomeServicesSection";
import HomeClientsSection from "./sections/HomeClientsSection";
import HomeProjectsSection from "./sections/HomeProjectsSection";
import HomeCtaSection from "./sections/HomeCtaSection";

type HomePageProps = {
  company: CompanyData;
  contactStatus: FormStatus;
  quoteStatus: FormStatus;
  onContactSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onQuoteSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function HomePage({ company, contactStatus, quoteStatus, onContactSubmit, onQuoteSubmit }: HomePageProps) {
  return (
    <main>
      <HeroSection company={company} />
      <ProductGallerySection />
      <AboutVideoSection />
      <TechnologySection />
      <HomeServicesSection/>
      <HomeProjectsSection />
      <HomeClientsSection />
      <HomeCtaSection/>
    </main>
  );
}
