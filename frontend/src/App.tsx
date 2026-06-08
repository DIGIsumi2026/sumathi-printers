import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import companyJson from "./data/company.json";
import Preloader from "./components/layout/Preloader";
import NavigationBar from "./components/layout/NavigationBar";
import FloatingDecor from "./components/layout/FloatingDecor";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Home/HomePage";
import { formToPayload, postForm } from "./lib/api";
import type { CompanyData, FormStatus } from "./types/site";
import CustomCursor from "./components/layout/CustomCursor";
import "./App.css";

const company = companyJson as CompanyData;

type ApiEndpoint = "/contact" | "/newsletter" | "/quote";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");
  const [quoteStatus, setQuoteStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 4200);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const submitForm = async (
    event: FormEvent<HTMLFormElement>,
    endpoint: ApiEndpoint,
    setStatus: (status: FormStatus) => void
  ): Promise<void> => {
    event.preventDefault();

    const form = event.currentTarget;

    setStatus("loading");

    try {
      await postForm(endpoint, formToPayload(form));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleContactSubmit = (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    return submitForm(event, "/contact", setContactStatus);
  };

  const handleQuoteSubmit = (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    return submitForm(event, "/quote", setQuoteStatus);
  };

  return (
    <>
      <CustomCursor />

      <Preloader visible={loading} brand={company.brand} />

      <FloatingDecor />

      <NavigationBar />

      <HomePage
        company={company}
        contactStatus={contactStatus}
        quoteStatus={quoteStatus}
        onContactSubmit={handleContactSubmit}
        onQuoteSubmit={handleQuoteSubmit}
      />

      <Footer />
    </>
  );
}