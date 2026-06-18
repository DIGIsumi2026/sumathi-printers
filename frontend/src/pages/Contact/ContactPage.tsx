import type { FormEvent } from "react";
import type { CompanyData, FormStatus } from "../../types/site";
import ContactHeroSection from "../Contact/sections/ContactHeroSection";
import ContactMainBlock from "../Contact/sections/ContactMainBlock";
import ContactMapSection from "../Contact/sections/ContactMapSection";
import "./Contact.css";

type ContactPageProps = {
  company: CompanyData;
  contactStatus: FormStatus;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ContactPage({
  company,
  contactStatus,
  onSubmit
}: ContactPageProps) {
  return (
    <main className="sp-contact-page">
      <ContactHeroSection />
      <ContactMainBlock
        company={company}
        contactStatus={contactStatus}
        onSubmit={onSubmit}
      />
      <ContactMapSection />
    </main>
  );
}
