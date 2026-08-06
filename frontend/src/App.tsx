import { FormEvent, lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import companyJson from "./data/company.json";
import ScrollManager from "./components/layout/ScrollManager";
import SmoothScroll from "./components/layout/SmoothScroll";

import Preloader from "./components/layout/Preloader";
import FloatingActions from "./components/common/FloatingActions";
import NavigationBar from "./components/layout/NavigationBar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/layout/CustomCursor";

import { formToPayload, postForm } from "./lib/api";
import useSectionWatermarkScroll from "./hooks/useSectionWatermarkScroll";
import type { CompanyData, FormStatus } from "./types/site";
import { ScrollLockProvider } from "./contexts/ScrollLockContext";

import "./App.css";
import "./responsive-corrections.css";

const HomePage     = lazy(() => import("./pages/Home/HomePage"));
const AboutPage    = lazy(() => import("./pages/About/AboutPage"));
const ServicesPage = lazy(() => import("./pages/Services/ServicesPage"));
const ProjectsPage = lazy(() => import("./pages/Projects/ProjectsPage"));
const GalleryPage  = lazy(() => import("./pages/Gallery/GalleryPage"));
const ContactPage  = lazy(() => import("./pages/Contact/ContactPage"));

const company = companyJson as CompanyData;
const PAGE_LOADER_MAX_DURATION = 850;
const PAGE_READY_SETTLE_DURATION = 120;
const PAGE_FAST_READY_DURATION = 420;

export default function App() {
  const location = useLocation();

  const [loading, setLoading]                   = useState(true);
  const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>("idle");
  const [contactStatus, setContactStatus]       = useState<FormStatus>("idle");
  const [quoteStatus, setQuoteStatus]           = useState<FormStatus>("idle");

  useSectionWatermarkScroll(location.pathname, !loading);

  useEffect(() => {
    let finished = false;
    let settleTimer = 0;

    const finish = (delay = 0) => {
      if (finished) return;
      finished = true;
      settleTimer = window.setTimeout(() => {
        setLoading(false);
      }, delay);
    };

    const maxTimer = window.setTimeout(() => {
      finish();
    }, PAGE_LOADER_MAX_DURATION);

    const handleLoad = () => {
      finish(PAGE_READY_SETTLE_DURATION);
    };

    if (document.readyState === "complete") {
      finish(PAGE_FAST_READY_DURATION);
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      window.clearTimeout(maxTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener("load", handleLoad);
    };
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
    // ScrollLockProvider must wrap the whole tree so both SmoothScroll
    // and NavigationBar can reach the same context instance.
    <ScrollLockProvider>
      <Preloader visible={loading} />
      <ScrollManager loading={loading} />

      <div className={`sp-site-content ${loading ? "is-blurred" : ""}`}>
        <SmoothScroll />
        <CustomCursor />

        <NavigationBar company={company} />

        <Suspense fallback={null}>
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

            <Route path="/about"   element={<AboutPage company={company} />} />
            <Route path="/services" element={<ServicesPage company={company} />} />
            <Route path="/projects" element={<ProjectsPage company={company} />} />
            <Route path="/gallery"  element={<GalleryPage company={company} />} />

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

            {/* Redirect legacy /home.html from old site directly to root */}
            <Route path="/home.html" element={<Navigate to="/" replace />} />
            
            {/* Catch-all route to prevent empty layout rendering on unknown URLs */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <Footer
          company={company}
          newsletterStatus={newsletterStatus}
          onSubmit={(event: FormEvent<HTMLFormElement>) =>
            submitForm(event, "/newsletter", setNewsletterStatus)
          }
        />
      </div>

      <FloatingActions />
    </ScrollLockProvider>
  );
}
