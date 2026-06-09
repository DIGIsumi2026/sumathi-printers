import { FormEvent, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import companyJson from "./data/company.json";

import Preloader from "./components/layout/Preloader";
import NavigationBar from "./components/layout/NavigationBar";
import FloatingTools from "./components/layout/FloatingTools";
import FloatingDecor from "./components/layout/FloatingDecor";
import CustomCursor from "./components/layout/CustomCursor";
import Footer from "./components/layout/Footer";

import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import ServicesPage from "./pages/Services/ServicesPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import ContactPage from "./pages/Contact/ContactPage";

import { formToPayload, postForm } from "./lib/api";
import type { CompanyData, FormStatus } from "./types/site";

import "./App.css";

const company = companyJson as CompanyData;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>("idle");
  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");
  const [quoteStatus, setQuoteStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 4200);
    return () => window.clearTimeout(timer);
  }, []);

  const submitForm = async (
    event: FormEvent<HTMLFormElement>,
    endpoint: "/contact" | "/newsletter" | "/quote",
    setStatus: (status: FormStatus) => void
  ) => {
    event.preventDefault();
    setStatus("loading");

    try {
      await postForm(endpoint, formToPayload(event.currentTarget));
      event.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Preloader visible={loading} brand={company.brand} />
      <FloatingDecor/>
      <CustomCursor/>
      <FloatingTools/>

      <NavigationBar company={company} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              company={company}
              contactStatus={contactStatus}
              quoteStatus={quoteStatus}
              onContactSubmit={(event) =>
                submitForm(event, "/contact", setContactStatus)
              }
              onQuoteSubmit={(event) =>
                submitForm(event, "/quote", setQuoteStatus)
              }
            />
          }
        />

        <Route path="/about" element={<AboutPage company={company} />} />
        <Route path="/services" element={<ServicesPage company={company} />} />
        <Route path="/projects" element={<ProjectsPage company={company} />} />
        <Route path="/gallery" element={<GalleryPage company={company} />} />

        <Route
          path="/contact"
          element={
            <ContactPage
              company={company}
              contactStatus={contactStatus}
              onSubmit={(event) =>
                submitForm(event, "/contact", setContactStatus)
              }
            />
          }
        />
      </Routes>

      <Footer
        company={company}
        newsletterStatus={newsletterStatus}
        onSubmit={(event) =>
          submitForm(event, "/newsletter", setNewsletterStatus)
        }
      />

    </>
  );
}