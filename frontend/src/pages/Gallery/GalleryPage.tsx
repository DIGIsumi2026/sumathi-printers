import type { CompanyData } from "../../types/site";
import ProjectsHeroHeader from "./sections/ProjectsHeroHeader";

type ProjectsPageProps = {
  company: CompanyData;
};

export default function ProjectsPage({ company }: ProjectsPageProps) {
  return (
    <main className="sp-inner-page">
      <ProjectsHeroHeader/>
    </main>
  );
}