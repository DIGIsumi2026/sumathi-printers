import type { CompanyData } from "../../types/site";
import SEO from "../../components/common/SEO";

import ProjectsHeroSection from "./sections/ProjectsHeroSection";
import ProjectsFacilitySection from "./sections/ProjectsFacilitySection";
import ProjectsCategoriesSection from "./sections/ProjectsCategoriesSection";
import ProjectsClientsSection from "./sections/ProjectsClientsSection";
import ProjectsCtaSection from "./sections/ProjectsCtaSection";

const SITE_URL = "https://www.sumathiprinters.lk";

type ProjectsPageProps = {
  company: CompanyData;
};

export default function ProjectsPage({ company }: ProjectsPageProps) {
  return (
    <>
      <SEO
        title="Our Projects | Sumathi Printers Portfolio Sri Lanka"
        description="Discover the diverse print projects completed by Sumathi Printers – from school textbooks and government publications to commercial packaging and promotional materials."
        canonical={`${SITE_URL}/projects`}
        keywords="printing projects Sri Lanka, printing portfolio, school books printing, government printing, commercial printing projects"
      />
      <main className="sp-inner-page">
        <ProjectsHeroSection />
        <ProjectsFacilitySection />
        <ProjectsCategoriesSection />
        <ProjectsClientsSection />
        <ProjectsCtaSection />
      </main>
    </>
  );
}