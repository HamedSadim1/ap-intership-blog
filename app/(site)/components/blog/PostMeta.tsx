/**
 * PostMeta - Metadata bar for blog post detail pages.
 *
 * Displays author info, estimated reading time, and publish date
 * in a horizontal flex layout.
 *
 * @example
 * <PostMeta
 *   author={post.author}
 *   publishedAt={post.published_at}
 *   readingTime="5 min"
 * />
 */

import Link from "next/link";
import { cn, TEXT_STYLES } from "@/lib/utils/styles";
import { CalendarIcon, ClockIcon } from "@/app/(site)/components/svgs";
import { AuthorInfo } from "./AuthorInfo";
import { formatDate } from "@/lib/utils/date";
import type { PostBySlugQueryResult } from "@/sanity/types";

type PostMetaAuthor = NonNullable<PostBySlugQueryResult>["author"];

interface PostMetaProps {
  /** Author object (Sanity type) */
  author?: PostMetaAuthor | null;
  /** ISO date string for publish date */
  publishedAt?: string | null;
  /** Formatted reading time string (e.g. "5 min") */
  readingTime: string;
}

export function PostMeta({ author, publishedAt, readingTime }: PostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-8 pb-8 border-b border-white/10">
      {author && publishedAt && (
        <Link href="/about" className="cursor-pointer shrink-0">
          <AuthorInfo author={author} publishedAt={publishedAt} />
        </Link>
      )}
      <div className="flex items-center gap-4 ml-auto">
        <span className={cn("text-sm flex items-center gap-1.5", TEXT_STYLES.faint)}>
          <ClockIcon className="w-4 h-4" />
          {readingTime}
        </span>
        {publishedAt && (
          <span className={cn("text-sm flex items-center gap-1.5", TEXT_STYLES.faint)}>
            <CalendarIcon className="w-4 h-4" />
            {formatDate(publishedAt)}
          </span>
        )}
      </div>
    </div>
  );
}
