import { FormEvent, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import companyJson from "./data/company.json";

import Preloader from "./components/layout/Preloader";
import NavigationBar from "./components/layout/NavigationBar";
import FloatingDecor from "./components/layout/FloatingDecor";
import FloatingTools from "./components/layout/FloatingTools";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/layout/CustomCursor";

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

const PAGE_LOADER_DURATION = 1500;

export default function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>("idle");
  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");
  const [quoteStatus, setQuoteStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    setLoading(true);

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, PAGE_LOADER_DURATION);

    return () => {
      window.clearTimeout(timer);
    };
  }, [location.pathname]);

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
      <Preloader visible={loading} />

      <div className={`sp-site-content ${loading ? "is-blurred" : ""}`}>
        <CustomCursor />
        <FloatingDecor />

        <NavigationBar company={company} />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                company={company}
                contactStatus={contactStatus}
                quoteStatus={quoteStatus}
                onContactSubmit={(event: FormEvent<HTMLFormElement>) =>
                  submitForm(event, "/contact", setContactStatus)
                }
                onQuoteSubmit={(event: FormEvent<HTMLFormElement>) =>
                  submitForm(event, "/quote", setQuoteStatus)
                }
              />
            }
          />

          <Route path="/about" element={<AboutPage company={company} />} />

          <Route
            path="/services"
            element={<ServicesPage company={company} />}
          />

          <Route
            path="/projects"
            element={<ProjectsPage company={company} />}
          />

          <Route path="/gallery" element={<GalleryPage company={company} />} />

          <Route
            path="/contact"
            element={
              <ContactPage
                company={company}
                contactStatus={contactStatus}
                onSubmit={(event: FormEvent<HTMLFormElement>) =>
                  submitForm(event, "/contact", setContactStatus)
                }
              />
            }
          />
        </Routes>

        <Footer
          company={company}
          newsletterStatus={newsletterStatus}
          onSubmit={(event: FormEvent<HTMLFormElement>) =>
            submitForm(event, "/newsletter", setNewsletterStatus)
          }
        />

        <FloatingTools />
      </div>
    </>
  );
}