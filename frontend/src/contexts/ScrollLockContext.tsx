/**
 * ScrollLockContext
 *
 * Provides a shared mechanism for NavigationBar to stop/start Lenis
 * without importing Lenis itself or creating a prop-drilling chain.
 *
 * Usage:
 *   - Wrap the app with <ScrollLockProvider>
 *   - In SmoothScroll: call registerLenis(lenisInstance) after creation
 *     and registerLenis(null) on cleanup
 *   - In NavigationBar: call lock() when opening the menu,
 *     unlock() when closing
 */

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode
} from "react";
import type Lenis from "lenis";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface ScrollLockContextValue {
  /** Register (or deregister) the active Lenis instance. */
  registerLenis: (instance: Lenis | null) => void;
  /** Stop Lenis + freeze native scroll. Saves current scroll position. */
  lock: () => void;
  /** Restart Lenis + restore native scroll at saved position. */
  unlock: () => void;
}

/* ------------------------------------------------------------------ */
/*  Context                                                             */
/* ------------------------------------------------------------------ */

const ScrollLockContext = createContext<ScrollLockContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                            */
/* ------------------------------------------------------------------ */

export function ScrollLockProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const savedScrollY = useRef<number>(0);
  const isLocked = useRef<boolean>(false);

  const registerLenis = useCallback((instance: Lenis | null) => {
    lenisRef.current = instance;
  }, []);

  const lock = useCallback(() => {
    if (isLocked.current) return;
    isLocked.current = true;

    // 1. Save the current position before anything moves.
    savedScrollY.current = window.scrollY;

    // 2. Stop Lenis so its RAF loop no longer moves the page.
    lenisRef.current?.stop();

    // 3. Lock html + body native scroll.
    //    Using position:fixed + top offset preserves visual position
    //    in browsers where overflow:hidden alone still allows scroll.
    const top = `-${savedScrollY.current}px`;
    document.documentElement.classList.add("sp-menu-open");
    document.documentElement.style.setProperty("--sp-scroll-lock-top", top);
    document.body.classList.add("sp-menu-open");
  }, []);

  const unlock = useCallback(() => {
    if (!isLocked.current) return;
    isLocked.current = false;

    // 1. Remove lock classes/styles first.
    document.documentElement.classList.remove("sp-menu-open");
    document.documentElement.style.removeProperty("--sp-scroll-lock-top");
    document.body.classList.remove("sp-menu-open");

    // 2. Restore the exact scroll position.
    window.scrollTo({ top: savedScrollY.current, behavior: "instant" });

    // 3. Resume Lenis.
    lenisRef.current?.start();
  }, []);

  return (
    <ScrollLockContext.Provider value={{ registerLenis, lock, unlock }}>
      {children}
    </ScrollLockContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                                */
/* ------------------------------------------------------------------ */

export function useScrollLock(): ScrollLockContextValue {
  const ctx = useContext(ScrollLockContext);
  if (!ctx) {
    throw new Error("useScrollLock must be used inside <ScrollLockProvider>");
  }
  return ctx;
}
