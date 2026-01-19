import { ReactNode } from "react";

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
  glass: "bg-white/10 backdrop-blur-sm",
  solid: "bg-white/20",
  ghost: "bg-transparent",
};

/**
 * Section - Herbruikbare sectie container met glassmorphism effect
 *
 * Consistent gestructureerde sectie voor content blokken met verschillende stijl varianten.
 * Gebruikt glassmorphism design pattern met blur effect en semi-transparante achtergrond.
 *
 * @example
 * // Standaard glassmorphism sectie
 * <Section>
 *   <h2>Titel</h2>
 *   <p>Content...</p>
 * </Section>
 *
 * @example
 * // Solide variant
 * <Section variant="solid">
 *   <div>Meer opvallende content</div>
 * </Section>
 *
 * @example
 * // Met custom classes
 * <Section className="mb-12">
 *   <p>Extra margin bottom</p>
 * </Section>
 */
const Section = ({
  children,
  className = "",
  variant = "glass",
}: SectionProps) => {
  return (
    <section
      className={`${variantStyles[variant]} rounded-2xl p-6 md:p-8 ${className}`}
    >
      {children}
    </section>
  );
};

export { Section };
export default Section;
