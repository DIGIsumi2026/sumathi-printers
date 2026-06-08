import type { FormEvent } from 'react';
import type { CompanyData, FormStatus } from '../../types/site';
import HeroSection from './sections/HeroSection';
import WhyStandoutSection from './sections/WhyStandoutSection';
import FeatureSection from './sections/FeatureSection';
import AboutSection from './sections/AboutSection';
import MissionVisionSection from './sections/MissionVisionSection';
import ServicesSection from './sections/ServicesSection';
import FinishingServicesSection from './sections/FinishingServicesSection';
import ProcessSection from './sections/ProcessSection';
import TestimonialSection from './sections/TestimonialSection';
import CategorySection from './sections/CategorySection';
import ClientsSection from './sections/ClientsSection';
import BlogSection from './sections/BlogSection';
import QuoteSection from './sections/QuoteSection';
import ContactSection from './sections/ContactSection';
import PartnersSection from './sections/PartnersSection';
import ProductGallerySection from "./sections/ProductGallerySection";
import AboutVideoSection from "./sections/AboutVideoSection";


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



      
      <WhyStandoutSection company={company} />
      <FeatureSection company={company} />
      <AboutSection company={company} />
      <MissionVisionSection company={company} />
      <ServicesSection company={company} />
      <FinishingServicesSection company={company} />
      <ProcessSection company={company} />
      <TestimonialSection company={company} />
      <CategorySection company={company} />
      <ClientsSection company={company} />
      <BlogSection company={company} />
      <QuoteSection company={company} quoteStatus={quoteStatus} onSubmit={onQuoteSubmit} />
      <ContactSection company={company} contactStatus={contactStatus} onSubmit={onContactSubmit} />
      <PartnersSection company={company} />
    </main>
  );
}
