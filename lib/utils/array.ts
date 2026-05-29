/**
 * Array Utilities
 *
 * Herbruikbare functies voor array-manipulatie.
 */

/**
 * extractTagSlugs - Extract slug strings from a tags array
 *
 * Handig voor het ophalen van gerelateerde posts op basis van gedeelde tags.
 * Filtert null/undefined slugs eruit.
 *
 * @param tags - Array van tags met optionele slug property, of null/undefined
 * @returns Array van geldige slug strings
 *
 * @example
 * extractTagSlugs([{ slug: { current: "typescript" } }, { slug: null }])
 * // Returns: ["typescript"]
 */
export function extractTagSlugs(
  tags: Array<{ slug?: { current?: string | null } | null }> | null | undefined,
): string[] {
  return (
    tags
      ?.map((t) => t.slug?.current)
      .filter((slug): slug is string => Boolean(slug)) ?? []
  );
}
