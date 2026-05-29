/**
 * estimateReadingTime - Schat leestijd op basis van tekst lengte
 *
 * Gebruikt ~200 woorden/minuut voor Nederlandse tekst.
 * Herbruikbaar voor zowel blog overzicht als detail pagina's.
 *
 * @param text - De body/excerpt tekst of null/undefined
 * @returns Leestijd string zoals "3 min leestijd"
 *
 * @example
 * estimateReadingTime("Dit is een korte tekst")
 * // Returns: "1 min leestijd"
 *
 * estimateReadingTime(null)
 * // Returns: "1 min leestijd"
 */
export function estimateReadingTime(text: string | null | undefined): string {
  if (!text) return "1 min leestijd";
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min leestijd`;
}
