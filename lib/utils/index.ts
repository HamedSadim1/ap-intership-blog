/**
 * Utility Functions
 *
 * Centraal export punt voor alle utility functies
 */

// Date & Time utilities
export { formatTime, formatDate, getRelativeTime } from "./date";

// Style utilities (DRY principe)
export * from "./styles";
export * from "./tag-styles";

// Markdown utilities
export { renderMarkdown, extractHeadings } from "./markdown";

/**
 * String Utilities
 */

/**
 * truncate - Verkort een string tot een specifieke lengte
 *
 * @param str - De string om te verkorten
 * @param length - Maximale lengte
 * @param suffix - Suffix om toe te voegen (default: "...")
 * @returns Verkorte string
 *
 * @example
 * ```ts
 * truncate("Dit is een lange tekst", 10)
 * // Returns: "Dit is een..."
 * ```
 */
export function truncate(str: string, length: number, suffix = "..."): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

/**
 * slugify - Converteer een string naar een URL-vriendelijke slug
 *
 * @param str - De string om te slugify
 * @returns URL-vriendelijke slug
 *
 * @example
 * ```ts
 * slugify("Mijn Eerste Post!")
 * // Returns: "mijn-eerste-post"
 * ```
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Array Utilities
 */

/**
 * unique - Verwijder duplicaten uit een array
 *
 * @param arr - De array om te filteren
 * @returns Array zonder duplicaten
 *
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3, 3])
 * // Returns: [1, 2, 3]
 * ```
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * groupBy - Groepeer array items op basis van een key functie
 *
 * @param arr - De array om te groeperen
 * @param key - Functie die de grouping key retourneert
 * @returns Object met gegroepeerde items
 *
 * @example
 * ```ts
 * const posts = [
 *   { id: 1, category: "tech" },
 *   { id: 2, category: "design" },
 *   { id: 3, category: "tech" }
 * ];
 * groupBy(posts, post => post.category)
 * // Returns: { tech: [...], design: [...] }
 * ```
 */
export function groupBy<T>(
  arr: T[],
  key: (item: T) => string,
): Record<string, T[]> {
  return arr.reduce(
    (result, item) => {
      const groupKey = key(item);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Class Name Utilities
 */

/**
 * cn - Combine classNames conditionally (simplified version of clsx)
 *
 * @param classes - Class names to combine
 * @returns Combined class name string
 *
 * @example
 * ```ts
 * cn("base-class", isActive && "active", "another-class")
 * // Returns: "base-class active another-class"
 * ```
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}
