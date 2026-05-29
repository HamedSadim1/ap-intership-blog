"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/app/(site)/components/svgs";

const SCROLL_THRESHOLD = 300;

/**
 * BackToTopButton - Scroll-to-top knop voor blog detail pagina.
 * Verschijnt pas na 300px scrollen met een fade-in animatie.
 */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 ease-[var(--ease-out)] shadow-lg hover:shadow-white/20 hover:scale-110 active:scale-95 cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll naar boven"
    >
      <ArrowUpIcon className="w-5 h-5" />
    </button>
  );
}
