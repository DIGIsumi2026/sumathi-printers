import { ArrowUp, Settings } from "lucide-react";

export default function FloatingTools() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>

      <button
        type="button"
        className="scroll-top"
        aria-label="Scroll to top"
        onClick={scrollToTop}
      >
        <ArrowUp size={22} />
      </button>
    </>
  );
}