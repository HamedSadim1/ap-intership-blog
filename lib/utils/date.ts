/**
 * Date & Time Utilities
 *
 * Herbruikbare functies voor datum en tijd formatting
 */

/**
 * formatTime - Formatteer een ISO date string naar leesbaar formaat
 *
 * Converteert een ISO 8601 datum string naar een lokaal geformatteerde string
 * met jaar, maand, dag, uur en minuut.
 *
 * @param dateString - ISO 8601 datum string of null
 * @returns Geformatteerde datum string of "Unknown date" bij null
 *
 * @example
 * ```ts
 * formatTime("2026-01-18T14:30:00Z")
 * // Returns: "18 januari 2026, 14:30"
 *
 * formatTime(null)
 * // Returns: "Unknown date"
 * ```
 */
export function formatTime(dateString: string | null): string {
  if (!dateString) {
    return "Unknown date";
  }

  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString(undefined, options);
}

/**
 * formatDate - Formatteer alleen de datum (zonder tijd)
 *
 * @param dateString - ISO 8601 datum string
 * @returns Geformatteerde datum string
 *
 * @example
 * ```ts
 * formatDate("2026-01-18T14:30:00Z")
 * // Returns: "18 januari 2026"
 * ```
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) {
    return "Unknown date";
  }

  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}

/**
 * getRelativeTime - Geef een relatieve tijd terug (bijv. "2 days ago")
 *
 * @param dateString - ISO 8601 datum string
 * @returns Relatieve tijd string
 *
 * @example
 * ```ts
 * getRelativeTime("2026-01-16T14:30:00Z") // vandaag is 18 jan
 * // Returns: "2 days ago"
 * ```
 */
export function getRelativeTime(dateString: string | null): string {
  if (!dateString) {
    return "Unknown date";
  }

  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}
