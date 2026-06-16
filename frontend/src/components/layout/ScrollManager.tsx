import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollManagerProps = {
  loading: boolean;
};

const SCROLL_KEY_PREFIX = "sumathi-scroll-position";

function getRouteKey(pathname: string, search: string) {
  return `${pathname}${search}`;
}

export default function ScrollManager({ loading }: ScrollManagerProps) {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    const routeKey = getRouteKey(location.pathname, location.search);

    const savePosition = () => {
      sessionStorage.setItem(
        `${SCROLL_KEY_PREFIX}:${routeKey}`,
        String(window.scrollY)
      );
    };

    window.addEventListener("beforeunload", savePosition);

    return () => {
      savePosition();
      window.removeEventListener("beforeunload", savePosition);
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (loading) return;

    const routeKey = getRouteKey(location.pathname, location.search);

    const timer = window.setTimeout(() => {
      if (location.hash) {
        const targetId = decodeURIComponent(location.hash.replace("#", ""));
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }

        return;
      }

      const savedPosition = sessionStorage.getItem(
        `${SCROLL_KEY_PREFIX}:${routeKey}`
      );

      window.scrollTo({
        top: savedPosition ? Number(savedPosition) : 0,
        behavior: "auto"
      });
    }, 120);

    return () => {
      window.clearTimeout(timer);
    };
  }, [location.pathname, location.search, location.hash, loading]);

  return null;
}