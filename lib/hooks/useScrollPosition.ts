"use client";

import { useState, useEffect, useRef } from "react";

/**
 * useScrollPosition - Track whether the user has scrolled past a threshold
 *
 * Throttled via requestAnimationFrame voor scroll-performance.
 * Hysteresis (5px dode zone) voorkomt rapid toggling bij de threshold.
 *
 * @param threshold - Scroll Y threshold in pixels (default: 10)
 * @returns Boolean indicating if scrolled past threshold
 *
 * @example
 * const isScrolled = useScrollPosition(10);
 * // isScrolled = true when window.scrollY > 10
 */
export function useScrollPosition(threshold: number = 10): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  const prevRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const wasScrolled = prevRef.current;

          // Hysteresis: 5px dode zone om rapid toggling te voorkomen
          const nowScrolled = wasScrolled
            ? scrollY > threshold - 5  // Vanuit ingeschakeld: 5px lager loslaten
            : scrollY > threshold + 5; // Vanuit uitgeschakeld: 5px hoger inschakelen

          if (nowScrolled !== wasScrolled) {
            prevRef.current = nowScrolled;
            setIsScrolled(nowScrolled);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Eerste check bij mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
