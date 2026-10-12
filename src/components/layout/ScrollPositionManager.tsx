import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const keyFor = (pathname: string, search: string) =>
  `winecalc_scroll:${pathname}${search}`;

const readPosition = (key: string): number => {
  try {
    const value = Number(sessionStorage.getItem(key));
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
};

/**
 * Preserve the list position when opening a calculator and restore it on Back.
 * Handles browser gestures/buttons as well as the in-app Back button.
 */
const ScrollPositionManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    const position = navigationType === "POP"
      ? readPosition(keyFor(location.pathname, location.search))
      : 0;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      window.scrollTo(0, position);
      // The restored accordion may change page height after the first frame.
      secondFrame = window.requestAnimationFrame(() => window.scrollTo(0, position));
    });
    const timeout = navigationType === "POP"
      ? window.setTimeout(() => window.scrollTo(0, position), 350)
      : undefined;

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [location.key, location.pathname, location.search, navigationType]);

  useEffect(() => {
    const key = keyFor(location.pathname, location.search);
    const save = () => {
      try {
        sessionStorage.setItem(key, String(window.scrollY));
      } catch {
        // Do not interrupt navigation when storage is unavailable.
      }
    };

    // Save before router links change their destination; regular scrolls keep
    // the snapshot up to date for browser swipe-back and hardware Back.
    window.addEventListener("scroll", save, { passive: true });
    document.addEventListener("click", save, true);
    window.addEventListener("pagehide", save);
    return () => {
      window.removeEventListener("scroll", save);
      document.removeEventListener("click", save, true);
      window.removeEventListener("pagehide", save);
    };
  }, [location.pathname, location.search]);

  return null;
};

export default ScrollPositionManager;
