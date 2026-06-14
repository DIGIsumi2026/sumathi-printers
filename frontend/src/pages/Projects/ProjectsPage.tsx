import type { CompanyData } from "../../types/site";
import ProjectsHeroSection from "./sections/ProjectsHeroSection";
import ProjectsFacilitySection from "./sections/ProjectsFacilitySection";

type ProjectsPageProps = {
  company: CompanyData;
};

export default function ProjectsPage({ company }: ProjectsPageProps) {
  return (
    <main className="sp-inner-page">
    <ProjectsHeroSection/>
    <ProjectsFacilitySection/>




      {/*<section className="container sp-inner-page-hero">
        <span className="sp-inner-page-kicker">Projects</span>
        <h1>Featured Print Projects</h1>
        <p>
          Explore selected commercial, publishing, packaging and institutional
          print work completed by {company.brand}.
        </p>
      </section> */}
    </main>
  );
}