import type { FormEvent } from "react";
import type { CompanyData, FormStatus } from "../../types/site";
import ContactSection from "../Home/sections/ContactSection";

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
    <main className="sp-inner-page">
      <ContactSection
        company={company}
        contactStatus={contactStatus}
        onSubmit={onSubmit}
      />
    </main>
  );
}