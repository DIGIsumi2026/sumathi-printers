import type { CompanyData } from "../../types/site";

type AboutPageProps = {
  company: CompanyData;
};

export default function AboutPage({ company }: AboutPageProps) {
  return (
    <main className="sp-inner-page">
      <section className="container sp-inner-page-hero">
        <span className="sp-inner-page-kicker">About Us</span>
        <h1>About {company.brand}</h1>
        <p>
          Sumathi Printers has served Sri Lanka’s printing and publishing
          industry with quality, technology and reliability.
        </p>
      </section>
    </main>
  );
}