/**
 * PageLayout - Herbruikbare pagina-wrapper (DRY / SSOT)
 *
 * Vervangt de gedupliceerde wrapper op 4 pagina's:
 * - blog/page.tsx (listing)
 * - blog/[slug]/page.tsx (detail)
 * - author/page.tsx
 * - about/page.tsx
 *
 * Consistente basis: bg-background, min-h-screen, padding en overflow.
 * Afwijkingen per pagina via <PageLayout className="...">.
 *
 * @example
 * // Standaard (blog listing, author)
 * <PageLayout>
 *   <BlogContent />
 * </PageLayout>
 *
 * @example
 * // Afwijkende padding (about)
 * <PageLayout className="pt-28 overflow-clip">
 *   <AboutContent />
 * </PageLayout>
 *
 * @example
 * // Geen bottom padding + andere overflow (blog detail)
 * <PageLayout className="pb-0 overflow-x-clip">
 *   <PostContent />
 * </PageLayout>
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils/styles";

interface PageLayoutProps {
  children: ReactNode;
  /** Extra classes om de defaults te overschrijven (bijv. pt-28, overflow-clip) */
  className?: string;
}

const defaults = "bg-background relative min-h-screen pt-24 pb-16 overflow-x-hidden";

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn(defaults, className)}>
      {children}
    </div>
  );
}
