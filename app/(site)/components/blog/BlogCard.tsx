/**
 * BlogCard - Herbruikbare blog card component (DRY / SSOT)
 *
 * Vervangt de gedupliceerde card-structuur in:
 * - app/(site)/blog/page.tsx (grid listing)
 * - app/(site)/blog/[slug]/page.tsx (related posts)
 *
 * Beide varianten delen dezelfde glasmorphism wrapper, image, tags,
 * reading-time en title-hover. De variant prop bepaalt wat er extra getoond wordt.
 *
 * @example
 * // Grid variant (blog listing)
 * <BlogCard
 *   post={post}
 *   variant="grid"
 *   index={index}
 *   isNew={new Date(post.published_at).getTime() > SEVEN_DAYS_AGO}
 * />
 *
 * @example
 * // Related variant (blog detail related posts)
 * <BlogCard post={related} variant="related" index={index} />
 */

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { estimateReadingTime } from "@/lib/utils/reading-time";
import { getRelativeTime } from "@/lib/utils/date";
import {
  GLASS_CLASSES,
  ROUNDED_CLASSES,
  TRANSITION_CLASSES,
  HOVER_CLASSES,
  TEXT_STYLES,
  GRADIENTS,
  cn,
} from "@/lib/utils/styles";
import { IMAGE_DIMENSIONS, MAX_TAGS_COMPACT } from "@/lib/constants";
import type { AllPostsQueryResult, RelatedPostsQueryResult } from "@/sanity/types";
import { AuthorInfo, TagList } from ".";
import { PostImageFallback } from "./PostImageFallback";
import { ClockIcon } from "../svgs";

/** Type union voor beide queries die dezelfde velden hebben */
type BlogCardPost =
  | AllPostsQueryResult[number]
  | RelatedPostsQueryResult[number];

interface BlogCardProps {
  post: BlogCardPost;
  variant: "grid" | "related";
  index: number;
  isNew?: boolean;
}

export function BlogCard({ post, variant, index, isNew = false }: BlogCardProps) {
  const readingTime = estimateReadingTime(post.body);

  const imageWidth =
    variant === "grid" ? IMAGE_DIMENSIONS.grid.width : IMAGE_DIMENSIONS.related.width;
  const imageHeight =
    variant === "grid" ? IMAGE_DIMENSIONS.grid.height : IMAGE_DIMENSIONS.related.height;
  const imageFallbackGradient =
    variant === "grid"
      ? "from-blue-500/20 via-purple-500/20 to-pink-500/20"
      : "from-cyan-500/20 via-blue-500/20 to-purple-500/20";

  return (
    <article
      className={cn(
        "group overflow-hidden shadow-lg flex flex-col",
        GLASS_CLASSES.light,
        ROUNDED_CLASSES.lg,
        TRANSITION_CLASSES.slowEase,
        HOVER_CLASSES.lift,
      )}
    >
      <Link
        href={`/blog/${post.slug?.current}`}
        className={cn(
          "block cursor-pointer",
          variant === "related" ? "flex flex-col h-full" : undefined,
        )}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          {post.featured_image ? (
            <Image
              src={urlFor(post.featured_image)
                .width(imageWidth)
                .height(imageHeight)
                .url()}
              alt={post.title ?? "Post image"}
              width={imageWidth}
              height={imageHeight}
              className={cn("w-full h-full object-cover", HOVER_CLASSES.image)}
            />
          ) : (
            <PostImageFallback gradient={imageFallbackGradient} />
          )}

          {/* "Nieuw!" badge (grid only) */}
          {isNew && variant === "grid" && (
            <span
              className={cn(
                "absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg",
                GRADIENTS.newBadge,
              )}
            >
              Nieuw!
            </span>
          )}

          {/* Gradient overlay (related only) */}
          {variant === "related" && (
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${GRADIENTS.cardHoverOverlay}`} />
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Tags + Reading time */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <TagList
              tags={post.tags?.slice(0, MAX_TAGS_COMPACT) || null}
              variant="compact"
              clickable={false}
            />
            <span
              className={cn(
                "text-xs whitespace-nowrap flex items-center gap-1",
                TEXT_STYLES.faint,
              )}
            >
              <ClockIcon className="w-3.5 h-3.5" />
              {readingTime}
            </span>
          </div>

          {/* Title */}
          <h2
            className={cn(
              variant === "grid" ? "text-xl" : "text-lg",
              "font-semibold text-white mb-2 line-clamp-2",
              GRADIENTS.cardTitleHover,
            )}
          >
            {post.title}
          </h2>

          {/* Excerpt (grid only) */}
          {variant === "grid" && post.excerpt && (
            <p className={cn("text-sm line-clamp-3 mb-4", TEXT_STYLES.muted)}>
              {post.excerpt}
            </p>
          )}

          {/* Excerpt (related only, shorter) */}
          {variant === "related" && post.excerpt && (
            <p className={cn("text-sm line-clamp-2", "text-white/50")}>
              {post.excerpt}
            </p>
          )}

          {/* Publish date + badge (grid only) */}
          {variant === "grid" && post.published_at && (
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("text-xs", TEXT_STYLES.faint)}>
                {getRelativeTime(post.published_at)}
              </span>
              {isNew && (
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              )}
            </div>
          )}

          {/* Footer (grid only — AuthorInfo) */}
          {variant === "grid" && (
            <div className="pt-4 border-t border-white/10">
              {post.author && post.published_at && (
                <AuthorInfo
                  author={post.author}
                  publishedAt={post.published_at}
                  compact
                />
              )}
            </div>
          )}

          {/* Footer (related only — reading time + "Verder lezen →") */}
          {variant === "related" && (
            <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
              <span
                className={cn(
                  "flex items-center gap-1.5 text-xs",
                  "text-white/50",
                )}
              >
                <ClockIcon className="w-3 h-3" />
                {readingTime}
              </span>
              <span className="text-cyan-300 group-hover:text-cyan-200 transition-colors duration-200 text-sm font-semibold tracking-wide">
                Verder lezen →
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
