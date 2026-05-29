/**
 * TagList — Toont tags als klikbare badges of statische labels
 *
 * Tags worden gedupliceerd op _id om duplicate key errors te voorkomen.
 * Gebruikt getTagClassName uit shared tag-styles utility voor consistente styling.
 *
 * @param tags - Array van tag objecten uit Sanity (kan null zijn)
 * @param variant - "default" (normal) of "compact" (kleiner, voor cards)
 * @param clickable - Of tags als Link naar /blog?tag=... renderen (default: true)
 * @returns Tag badges in een flex-wrap container, of null bij lege input
 *
 * @example
 * <TagList tags={post.tags} />
 * <TagList tags={post.tags} variant="compact" clickable={false} />
 */

import Link from "next/link";
import type { PostBySlugQueryResult } from "@/sanity/types";
import { getTagClassName } from "@/lib/utils/tag-styles";

type Tags = NonNullable<PostBySlugQueryResult>["tags"];

interface TagListProps {
  /** Array van tag objecten uit Sanity */
  tags: Tags;
  /** "default" (normal) of "compact" (kleiner, voor cards) */
  variant?: "default" | "compact";
  /** Of tags als Link naar /blog?tag=... renderen (default: true) */
  clickable?: boolean;
}

export function TagList({
  tags,
  variant = "default",
  clickable = true,
}: TagListProps) {
  if (!tags || tags.length === 0) return null;

  // Dedupliceer tags op _id om duplicate key errors te voorkomen
  const uniqueTags = tags.filter(
    (tag, index, self) => index === self.findIndex((t) => t._id === tag._id)
  );

  return (
    <div className="flex flex-wrap gap-2">
      {uniqueTags.map((tag) => {
        if (!clickable) {
          return (
            <span
              key={tag._id}
              className={getTagClassName(variant, false, false)}
            >
              {tag.name}
            </span>
          );
        }

        return (
          <Link
            key={tag._id}
            href={`/blog?tag=${tag.slug?.current}`}
            className={getTagClassName(variant, false, true)}
          >
            {tag.name}
          </Link>
        );
      })}
    </div>
  );
}
