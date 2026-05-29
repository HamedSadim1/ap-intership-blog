"use client";

import { ArrowUpIcon } from "@/app/(site)/components/svgs";

/**
 * BackToTopButton - Scroll-to-top knop voor blog detail pagina
 * Wordt onderaan rechts getoond en scrollt smooth naar boven
 */
export function BackToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-white/20 hover:scale-110 cursor-pointer"
      aria-label="Scroll naar boven"
    >
      <ArrowUpIcon className="w-5 h-5" />
    </button>
  );
}
