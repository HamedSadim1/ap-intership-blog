import { ReactNode } from "react";
import { GLASS_CLASSES, ROUNDED_CLASSES, cn } from "@/lib/utils/styles";

/**
 * Props voor Section component
 * @property children - Inhoud van de sectie
 * @property className - Extra Tailwind classes (optioneel)
 * @property variant - Stijl variant: "glass" | "solid" | "ghost" (default: "glass")
 */
interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "glass" | "solid" | "ghost";
}

/** Styling per section variant */
const variantStyles = {
  glass: GLASS_CLASSES.light,
  solid: "bg-white/20",
  ghost: "bg-transparent",
};

/**
 * Section — Herbruikbare sectie container met glass varianten
 *
 * Drie varianten: glass (semi-transparant), solid (meer dekkend) en ghost (transparant).
 * Consistent padding en rounded via shared style utilities.
 *
 * @param children - Inhoud van de sectie
 * @param variant - Stijl variant (default: "glass")
 * @param className - Extra Tailwind classes (optioneel)
 *
 * @example
 * // Standaard glassmorphism sectie
 * <Section>
 *   <h2>Titel</h2>
 * </Section>
 *
 * @example
 * <Section variant="solid" className="mb-12">
 *   <p>Content</p>
 * </Section>
 */
const Section = ({
  children,
  className = "",
  variant = "glass",
}: SectionProps) => {
  return (
    <section
      className={cn(variantStyles[variant], ROUNDED_CLASSES.lg, "p-6 md:p-8", className)}
    >
      {children}
    </section>
  );
};

export { Section };
export default Section;
