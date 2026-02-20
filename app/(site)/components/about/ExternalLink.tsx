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
    primary: "bg-purple-500/20 hover:bg-purple-500/30",
    secondary: "bg-white/10 hover:bg-white/20",
  };

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors cursor-pointer ${variantStyles[variant]}`}
    >
      {children}
      {external && <ExternalLinkIcon className="w-4 h-4" />}
    </Link>
  );
}
