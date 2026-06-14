import { ArrowUp, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const whatsappMessage = encodeURIComponent(
  "Hello Sumathi Printers, I would like to get a quote for a printing project."
);

const whatsappLink = `https://wa.me/9477426900?text=${whatsappMessage}`;

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="sp-floating-actions" aria-label="Floating quick actions">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Sumathi Printers on WhatsApp"
        className="sp-floating-action sp-floating-whatsapp"
      >
        <MessageCircle size={23} />
        <span className="sp-floating-tooltip">Chat With Us</span>
      </a>

      <button
        type="button"
        aria-label="Go to top"
        className={`sp-floating-action sp-floating-scroll ${
          showScrollTop ? "is-visible" : ""
        }`}
        onClick={scrollToTop}
      >
        <ArrowUp size={23} />
        <span className="sp-floating-tooltip">Back To Top</span>
      </button>
    </div>
  );
}