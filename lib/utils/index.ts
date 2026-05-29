/**
 * Utility Functions
 *
 * Centraal export punt voor alle utility functies
 */

// Date & Time utilities
export { formatTime, formatDate, getRelativeTime } from "./date";

// String utilities
export { escapeHtml, slugify } from "./string";

// Array utilities
export { extractTagSlugs } from "./array";

// Math utilities
export { clamp } from "./math";

// Style utilities (DRY principe)
export * from "./styles";
export * from "./tag-styles";

// Reading time utility
export { estimateReadingTime } from "./reading-time";
