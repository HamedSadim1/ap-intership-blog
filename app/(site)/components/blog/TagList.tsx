/**
 * TagList Component
 *
 * Herbruikbare component voor het weergeven van blog post tags.
 * Gebruikt shared tag styling utilities volgens DRY principe.
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
  tags: Tags;
  variant?: "default" | "compact";
  clickable?: boolean;
}

export function TagList({
  tags,
  variant = "default",
  clickable = true,
}: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
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
