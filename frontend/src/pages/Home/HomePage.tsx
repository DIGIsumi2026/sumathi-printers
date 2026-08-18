import type { FormEvent } from "react";
import type { CompanyData, FormStatus } from "../../types/site";
import SEO from "../../components/common/SEO";

// sections
import HeroSection from "./sections/HeroSection";
import AboutVideoSection from "./sections/AboutVideoSection";
import TechnologySection from "./sections/TechnologySection";
import ProductGallerySection from "./sections/ProductGallerySection";
import HomeServicesSection from "./sections/HomeServicesSection";
import HomeClientsSection from "./sections/HomeClientsSection";
import HomeProjectsSection from "./sections/HomeProjectsSection";
import HomeCtaSection from "./sections/HomeCtaSection";

const SITE_URL = "https://www.sumathiprinters.lk";

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sumathi Printers",
    "url": SITE_URL,
    "logo": `${SITE_URL}/sumathi-icon.svg`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94-77-426-9000",
      "contactType": "customer service",
      "areaServed": "LK",
      "availableLanguage": ["English", "Sinhala"]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sumathi Printers",
    "url": SITE_URL
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Sumathi Printers",
    "@id": SITE_URL,
    "url": SITE_URL,
    "image": `${SITE_URL}/og-image.jpg`,
    "description": "Professional printing services in Sri Lanka including offset printing, packaging, books, brochures, and promotional materials.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK"
    },
    "priceRange": "$$",
    "sameAs": []
  }
];

type HomePageProps = {
  company: CompanyData;
  contactStatus: FormStatus;
  quoteStatus: FormStatus;
  onContactSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onQuoteSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function HomePage({ company, contactStatus, quoteStatus, onContactSubmit, onQuoteSubmit }: HomePageProps) {
  return (
    <>
      <SEO
        title="Sumathi Printers | Professional Printing Solutions in Sri Lanka"
        description="Sumathi Printers provides high-quality printing services including offset printing, packaging, books, brochures, business stationery, promotional materials, and custom print solutions in Sri Lanka."
        canonical={SITE_URL}
        structuredData={homeStructuredData}
      />
      <main>
        <HeroSection company={company} />
        <ProductGallerySection />
        <AboutVideoSection />
        <TechnologySection />
        <HomeServicesSection />
        <HomeProjectsSection />
        <HomeClientsSection />
        <HomeCtaSection />
      </main>
    </>
  );
}