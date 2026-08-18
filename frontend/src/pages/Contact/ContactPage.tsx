import type { FormEvent } from "react";
import type { CompanyData, FormStatus } from "../../types/site";
import SEO from "../../components/common/SEO";

import ContactHeroSection from "../Contact/sections/ContactHeroSection";
import ContactMainBlock from "../Contact/sections/ContactMainBlock";
import ContactMapSection from "../Contact/sections/ContactMapSection";

import "./Contact.css";

const SITE_URL = "https://www.sumathiprinters.lk";

type ContactPageProps = {
  company: CompanyData;
  contactStatus: FormStatus;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ContactPage({ company, contactStatus, onSubmit }: ContactPageProps) {
  return (
    <>
      <SEO
        title="Contact Sumathi Printers | Get a Quote – Sri Lanka"
        description="Get in touch with Sumathi Printers for professional printing services across Sri Lanka. Request a quote, ask a question, or visit us – we are ready to help."
        canonical={`${SITE_URL}/contact`}
        keywords="contact Sumathi Printers, printing quote Sri Lanka, printing inquiry, get a quote printing"
      />
      <main className="sp-contact-page">
        <ContactHeroSection />
        <ContactMainBlock company={company} contactStatus={contactStatus} onSubmit={onSubmit} />
        <ContactMapSection />
      </main>
    </>
  );
}