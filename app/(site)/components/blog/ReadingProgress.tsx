"use client";

import { GRADIENTS } from "@/lib/utils/styles";
import { useReadingProgress } from "@/lib/hooks";

/**
 * ReadingProgress - Horizontale leesvoortgang balk
 *
 * Toont scroll-voortgang door het artikel als een gradient balkje
 * bovenaan de pagina. Gebruikt de useReadingProgress hook die
 * clamp() toepast om het percentage tussen 0-100 te houden.
 *
 * @example
 * <ReadingProgress />
 */
export function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
      <div
        className={`h-full transition-all duration-150 ease-out ${GRADIENTS.progress}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
