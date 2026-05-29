/**
 * PostImageFallback - Herbruikbare fallback voor blog posts zonder featured image
 *
 * Single source of truth voor image placeholders — was gedupliceerd in
 * blog/page.tsx en blog/[slug]/page.tsx met net andere gradient-kleuren.
 *
 * @example
 * // Standaard gradient (blog listing)
 * <PostImageFallback />
 *
 * @example
 * // Aangepaste gradient (related posts)
 * <PostImageFallback gradient="from-cyan-500/20 via-blue-500/20 to-purple-500/20" />
 */

import { cn } from "@/lib/utils/styles";

interface PostImageFallbackProps {
  /** Aangepaste gradient (Tailwind bg-linear-to-br ... classes) */
  gradient?: string;
  /** Extra classes */
  className?: string;
}

export function PostImageFallback({
  gradient = "from-blue-500/20 via-purple-500/20 to-pink-500/20",
  className,
}: PostImageFallbackProps) {
  return (
    <div
      className={cn(
        "w-full h-full bg-linear-to-br flex items-center justify-center",
        gradient,
        className,
      )}
    >
      <span className="text-white/30 text-4xl">📝</span>
    </div>
  );
}
