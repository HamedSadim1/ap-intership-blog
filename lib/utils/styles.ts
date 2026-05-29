/**
 * Shared CSS Class Utilities
 * Herbruikbare Tailwind class combinaties volgens DRY principe
 */

/**
 * Glassmorphism effect classes
 */
export const GLASS_CLASSES = {
  card: "backdrop-blur-xl bg-white/10 border border-white/20",
  light: "backdrop-blur-sm bg-white/10",
  dark: "backdrop-blur-md bg-white/5",
} as const;

/**
 * Transition classes
 */
export const TRANSITION_CLASSES = {
  all: "transition-all duration-200",
  colors: "transition-colors duration-200",
  transform: "transition-transform duration-200",
  opacity: "transition-opacity duration-200",
  fast: "transition-all duration-150",
  slow: "transition-all duration-300",
} as const;

/**
 * Rounded classes
 */
export const ROUNDED_CLASSES = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
} as const;

/**
 * Helper function om classes te combineren
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}


