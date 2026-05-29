import Link from "next/link";
import { ReactNode } from "react";

/** Beschikbare button varianten */
type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Props voor Button component
 * @property children - Button tekst/inhoud
 * @property href - URL voor link (maakt het een <Link> in plaats van <button>)
 * @property onClick - Click handler (voor button variant)
 * @property variant - Visuele stijl: "primary" | "secondary" | "ghost" (default: "primary")
 * @property icon - Icoon component om rechts van tekst te tonen
 * @property className - Extra Tailwind classes (optioneel)
 * @property external - Open link in nieuw tabblad (default: false)
 */
interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
}

/** Styling per button variant */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-purple-500/20 text-white border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20",
  secondary: "bg-white/10 text-white border border-white/30 hover:bg-white/20",
  ghost: "text-cyan-300 hover:text-cyan-200",
};

/**
 * Button - Veelzijdige button/link component met meerdere varianten
 * Kan fungeren als button of als Next.js Link afhankelijk van props
 *
 * @example
 * // Primary button met icoon
 * <Button href="/portfolio" icon={<ArrowIcon />}>Bekijk portfolio</Button>
 *
 * @example
 * // Secondary variant
 * <Button variant="secondary" onClick={handleClick}>Secundair</Button>
 *
 * @example
 * // Ghost variant voor subtiele links
 * <Button variant="ghost" href="/more">Meer info</Button>
 *
 * @example
 * // Externe link (opent in nieuw tabblad)
 * <Button href="https://example.com" external>Externe site</Button>
 */
const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  className = "",
  external = false,
}: ButtonProps) => {
  // Basis styling die voor alle varianten geldt
  const baseStyles =
    "group inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-2xl transition-[transform,background-color] duration-200 ease-out hover:scale-105 active:scale-[0.97] cursor-pointer";

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        <span>{children}</span>
        {icon && (
          <span className="group-hover:translate-x-1 transition-transform">
            {icon}
          </span>
        )}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      <span>{children}</span>
      {icon && (
        <span className="group-hover:translate-x-1 transition-transform">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
