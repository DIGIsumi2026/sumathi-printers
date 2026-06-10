import type { CompanyData } from "../../types/site";

import AboutIntroVideoSection from "./sections/AboutIntroVideoSection";
import AboutStorySection from "./sections/AboutStorySection";

type AboutPageProps = {
  company: CompanyData;
};

export default function AboutPage({ company }: AboutPageProps) {
  return (
    <main>
      <AboutIntroVideoSection/>
      <AboutStorySection/>
    </main>
  );
}