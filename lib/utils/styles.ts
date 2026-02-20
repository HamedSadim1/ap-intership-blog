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
 * Hover effect classes
 */
export const HOVER_CLASSES = {
  scale: "hover:scale-105",
  scaleSmall: "hover:scale-102",
  lift: "hover:-translate-y-1",
  brighten: "hover:bg-white/20",
  glow: "hover:shadow-lg hover:shadow-white/25",
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
 * Link/Button base classes
 */
export const INTERACTIVE_CLASSES = {
  base: "cursor-pointer transition-colors",
  link: "inline-flex items-center gap-2 cursor-pointer transition-colors",
  button:
    "inline-flex items-center justify-center gap-2 cursor-pointer transition-all",
} as const;

/**
 * Common padding classes
 */
export const PADDING_CLASSES = {
  xs: "px-2 py-1",
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  lg: "px-6 py-3",
  xl: "px-8 py-4",
} as const;

/**
 * Helper function om classes te combineren
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Voorgedefinieerde combinaties
 */
export const COMMON_PATTERNS = {
  glassCard: cn(GLASS_CLASSES.card, ROUNDED_CLASSES.lg, "shadow-lg"),
  interactiveLink: cn(INTERACTIVE_CLASSES.link, TRANSITION_CLASSES.colors),
  tag: cn(
    ROUNDED_CLASSES.full,
    "bg-white/20 text-white",
    TRANSITION_CLASSES.colors,
  ),
  navButton: cn(
    ROUNDED_CLASSES.sm,
    "p-2 hover:bg-white/10",
    TRANSITION_CLASSES.colors,
  ),
} as const;
