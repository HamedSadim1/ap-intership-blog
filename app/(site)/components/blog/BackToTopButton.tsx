"use client";

import { ArrowUpIcon } from "@/app/(site)/components/svgs";
import { ROUNDED_CLASSES, HOVER_CLASSES, TRANSITION_CLASSES, cn } from "@/lib/utils/styles";
import { useScrollVisibility } from "@/lib/hooks";

const SCROLL_THRESHOLD = 300;

/**
 * BackToTopButton - Floating scroll-to-top knop
 *
 * Verschijnt pas na 300px scrollen met een fade-in + translate animatie.
 * Gebruikt useScrollVisibility hook (alias voor useScrollPosition met threshold 300).
 * Voert smooth scroll uit naar bovenaan de pagina bij klik.
 *
 * @example
 * <BackToTopButton />
 */
export function BackToTopButton() {
  const visible = useScrollVisibility(SCROLL_THRESHOLD);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-12 h-12",
        "flex items-center justify-center shadow-lg hover:shadow-white/20 cursor-pointer",
        ROUNDED_CLASSES.full,
        "bg-white/15 border border-white/20",
        "hover:text-white hover:bg-white/20",
        "text-white/70",
        TRANSITION_CLASSES.slowEase,
        HOVER_CLASSES.scaleSm,
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Scroll naar boven"
    >
      <ArrowUpIcon className="w-5 h-5" />
    </button>
  );
}
