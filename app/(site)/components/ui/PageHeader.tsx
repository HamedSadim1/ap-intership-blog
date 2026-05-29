import { cn, GRADIENTS } from "@/lib/utils/styles";
import type { ReactNode } from "react";

interface PageHeaderProps {
  /** Titel — string of JSX voor split titles (prefix + gradient highlight) */
  title: ReactNode;
  /** Ondertitel/beschrijving onder de titel */
  subtitle: string;
  /** Optionele content boven de titel (bv. ProfileHeader, badge) */
  children?: ReactNode;
  /** Toon accent divider lijn onder de subtitle (default: true) */
  showDivider?: boolean;
  /** Titel grootte variant */
  size?: "hero" | "default";
  /** Buitenste wrapper classes */
  className?: string;
}

const titleSizes = {
  hero: "text-4xl md:text-6xl lg:text-7xl",
  default: "text-4xl md:text-6xl",
} as const;

const subtitleSizes = {
  hero: "text-lg md:text-xl",
  default: "text-lg",
} as const;

/**
 * PageHeader — Herbruikbare pagina header met gradient titel en ondertitel
 *
 * Gebruikt door:
 * - Hero (landingspagina) — size="hero"
 * - Blog listing — size="default"
 */
export function PageHeader({
  title,
  subtitle,
  children,
  showDivider = true,
  size = "default",
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("text-center mb-12 px-4", className)}>
      {children}
      <h1
        className={cn(
          "font-bold text-white mb-4 leading-tight",
          titleSizes[size],
        )}
      >
        {title}
      </h1>
      <p
        className={cn(
          "text-white/85 leading-relaxed text-center max-w-2xl mx-auto",
          subtitleSizes[size],
        )}
      >
        {subtitle}
      </p>
      {showDivider && (
        <div className={`mt-6 mx-auto w-24 h-1 rounded-full ${GRADIENTS.accent}`} />
      )}
    </header>
  );
}
