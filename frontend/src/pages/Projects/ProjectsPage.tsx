import type { CompanyData } from "../../types/site";
import ProjectsHeroSection from "./sections/ProjectsHeroSection";
import ProjectsFacilitySection from "./sections/ProjectsFacilitySection";
import ProjectsCategoriesSection from "./sections/ProjectsCategoriesSection";
import ProjectsClientsSection from "./sections/ProjectsClientsSection";
import ProjectsCtaSection from "./sections/ProjectsCtaSection";

type ProjectsPageProps = {
  company: CompanyData;
};

export default function ProjectsPage({ company }: ProjectsPageProps) {
  return (
    <main className="sp-inner-page">
    <ProjectsHeroSection/>
    <ProjectsFacilitySection/>
    <ProjectsCategoriesSection/>
    <ProjectsClientsSection/>
    <ProjectsCtaSection/>

    </main>
  );
}