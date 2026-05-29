/**
 * ExternalLink Component
 *
 * Link component met automatisch external link icoon en veilige attributen.
 * Ondersteunt interne en externe links met type-safe variants.
 *
 * @example
 * <ExternalLink href="https://example.com" external>
 *   Visit Website
 * </ExternalLink>
 */

import Link from "next/link";
import { ExternalLinkIcon } from "../svgs";
import { ROUNDED_CLASSES, TRANSITION_CLASSES, HOVER_CLASSES, cn } from "@/lib/utils/styles";

interface ExternalLinkProps {
  href: string;
  children: string;
  external?: boolean;
  variant?: "primary" | "secondary";
}

export function ExternalLink({
  href,
  children,
  external = false,
  variant = "secondary",
}: ExternalLinkProps) {
  const variantStyles = {
    primary:
      "bg-purple-500/20 border border-purple-400/20 hover:bg-purple-500/30 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20",
    secondary:
      "bg-white/10 border border-white/15 hover:bg-white/20 hover:border-white/30 hover:shadow-lg",
  };

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-2 px-5 py-2.5",
        "text-white font-medium cursor-pointer",
        ROUNDED_CLASSES.sm,
        TRANSITION_CLASSES.mediumEase,
        HOVER_CLASSES.scale,
        variantStyles[variant],
      )}
    >
      <span>{children}</span>
      {external && (
        <ExternalLinkIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      )}
    </Link>
  );
}
