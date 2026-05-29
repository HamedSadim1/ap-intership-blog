import { ArrowLeftIcon } from "@/app/(site)/components/svgs";
import { cn } from "@/lib/utils/styles";
import Link from "next/link";

interface BackToBlogsLinkProps {
  /** URL om naar te navigeren (default: /blog) */
  href?: string;
  /** Link tekst (default: "Terug naar blogs") */
  label?: string;
  /** Buitenste wrapper classes */
  className?: string;
}

/**
 * BackToBlogsLink — Navigatie link terug naar het blog overzicht
 *
 * Toont een gecentreerde link met een pijl-icoon in een cirkel.
 * Wordt onderaan de blog detail pagina gebruikt.
 *
 * @example
 * <BackToBlogsLink />
 * <BackToBlogsLink href="/blog?tag=typescript" label="Terug naar TypeScript posts" />
 */
export function BackToBlogsLink({
  href = "/blog",
  label = "Terug naar blogs",
  className,
}: BackToBlogsLinkProps) {
  return (
    <div className={cn("mt-12 text-center", className)}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-[color,gap] duration-200 hover:gap-3 cursor-pointer group"
      >
        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <ArrowLeftIcon className="h-4 w-4" />
        </span>
        {label}
      </Link>
    </div>
  );
}
