import type { CompanyData } from "../../types/site";
import GalleryHeroSection from "./sections/GalleryHeroSection";
import GalleryGridSection from "./sections/GalleryGridSection";

import "./Gallery.css";

type GalleryPageProps = {
  company?: CompanyData;
};

export default function GalleryPage({ company: _company }: GalleryPageProps) {
  return (
    <main className="sp-gallery-page">
      <GalleryHeroSection />
      <GalleryGridSection/>
    </main>
  );
}