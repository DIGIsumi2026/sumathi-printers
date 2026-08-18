import type { CompanyData } from "../../types/site";
import SEO from "../../components/common/SEO";

import GalleryHeroSection from "./sections/GalleryHeroSection";
import GalleryGridSection from "./sections/GalleryGridSection";
import GalleryQualityDivider from "./sections/GalleryQualityDivider";
import GalleryCtaSection from "./sections/GalleryCtaSection";

import "./Gallery.css";

const SITE_URL = "https://www.sumathiprinters.lk";

type GalleryPageProps = {
  company?: CompanyData;
};

export default function GalleryPage({ company: _company }: GalleryPageProps) {
  return (
    <>
      <SEO
        title="Print Gallery | Sumathi Printers Sri Lanka"
        description="Browse the Sumathi Printers gallery showcasing high-quality printed products – books, magazines, packaging, promotional materials, and premium finishing services."
        canonical={`${SITE_URL}/gallery`}
        keywords="printing gallery Sri Lanka, printed products showcase, printing samples, book printing gallery, packaging samples"
      />
      <main className="sp-gallery-page">
        <GalleryHeroSection />
        <GalleryGridSection />
        <GalleryQualityDivider />
        <GalleryCtaSection />
      </main>
    </>
  );
}