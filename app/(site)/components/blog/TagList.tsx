/**
 * TagList Component
 *
 * Herbruikbare component voor het weergeven van blog post tags met consistente styling.
 * Ondersteunt zowel clickable links als statische badges om nested link problemen te voorkomen.
 *
 * Features:
 * - Twee size varianten: 'default' en 'compact'
 * - Optionele clickability (voorkomt <a> binnen <a> hydration errors)
 * - Automatische filtering naar blog pagina bij klik
 * - Glassmorphism design met hover effects
 *
 * @example
 * // Clickable tags op detail pagina
 * <TagList tags={post.tags} />
 *
 * @example
 * // Non-clickable tags binnen een Link component (blog listing)
 * <Link href={`/blog/${slug}`}>
 *   <TagList tags={post.tags} variant="compact" clickable={false} />
 * </Link>
 *
 * @see PostBySlugQueryResult voor tag type definitie
 */

import Link from "next/link";
import type { PostBySlugQueryResult } from "@/sanity/types";

type Tags = NonNullable<PostBySlugQueryResult>["tags"];

interface TagListProps {
  tags: Tags;
  variant?: "default" | "compact";
  clickable?: boolean;
}

/**
 * TagList - Display clickable tag badges
 *
 * Reusable component for rendering post tags with consistent styling.
 * Links to blog page filtered by tag.
 */
export function TagList({
  tags,
  variant = "default",
  clickable = true,
}: TagListProps) {
  if (!tags || tags.length === 0) return null;

  const padding =
    variant === "compact" ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm";
  const baseClasses = `${padding} rounded-full bg-white/20 text-white transition-colors`;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const content = tag.name;

        if (!clickable) {
          return (
            <span
              key={tag._id}
              className={`${baseClasses} bg-purple-500/20 text-purple-200`}
            >
              {content}
            </span>
          );
        }

        return (
          <Link
            key={tag._id}
            href={`/blog?tag=${tag.slug?.current}`}
            className={`${baseClasses} hover:bg-white/30`}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
