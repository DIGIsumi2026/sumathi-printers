import type { CompanyData } from "../../types/site";

import AboutIntroVideoSection from "./sections/AboutIntroVideoSection";
import AboutStorySection from "./sections/AboutStorySection";
import AboutVisionMissionSection from "./sections/AboutVisionMissionSection";

type AboutPageProps = {
  company: CompanyData;
};

export default function AboutPage({ company }: AboutPageProps) {
  return (
    <main>
      <AboutIntroVideoSection/>
      <AboutStorySection/>
      <AboutVisionMissionSection/>
    </main>
  );
}