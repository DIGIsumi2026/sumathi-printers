import type { CompanyData } from "../../types/site";
import SEO from "../../components/common/SEO";

import AboutIntroVideoSection from "./sections/AboutIntroVideoSection";
import AboutStorySection from "./sections/AboutStorySection";
import AboutVisionMissionSection from "./sections/AboutVisionMissionSection";
import AboutBoardSection from "./sections/AboutBoardSection";
import AboutCompaniesSection from "./sections/AboutCompaniesSection";
import AboutServicesProjectsSection from "./sections/AboutServicesProjectsSection";

const SITE_URL = "https://www.sumathiprinters.lk";

type AboutPageProps = {
  company: CompanyData;
};

export default function AboutPage({ company }: AboutPageProps) {
  return (
    <>
      <SEO
        title="About Sumathi Printers | Our Story, Vision & Leadership"
        description="Learn about Sumathi Printers – our story, mission, vision, board of directors, and the companies we serve across Sri Lanka with world-class printing solutions."
        canonical={`${SITE_URL}/about`}
        keywords="about Sumathi Printers, printing company Sri Lanka, printing history, board of directors, printing vision mission"
      />
      <main>
        <AboutIntroVideoSection />
        <AboutStorySection />
        <AboutVisionMissionSection />
        <AboutBoardSection />
        <AboutCompaniesSection />
        <AboutServicesProjectsSection />
      </main>
    </>
  );
}