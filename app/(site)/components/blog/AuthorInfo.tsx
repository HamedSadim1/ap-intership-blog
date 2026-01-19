import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatTime } from "@/lib/utils";
import type { PostBySlugQueryResult } from "@/sanity/types";

type Author = NonNullable<PostBySlugQueryResult>["author"];
type PublishedAt = string;

interface AuthorInfoProps {
  author: Author;
  publishedAt: PublishedAt;
  compact?: boolean;
}

/**
 * AuthorInfo - Display author avatar, name, and publish date
 * 
 * Reusable component for both blog listing cards and post detail pages.
 * Supports compact mode for smaller displays.
 */
export function AuthorInfo({ author, publishedAt, compact = false }: AuthorInfoProps) {
  if (!author) return null;

  const avatarSize = compact ? 32 : 48;
  const textSize = compact ? "text-sm" : "text-base";

  return (
    <div className="flex items-center gap-3">
      {author.image && (
        <Image
          src={urlFor(author.image).width(avatarSize).height(avatarSize).url()}
          alt={author.username ?? "Author"}
          width={avatarSize}
          height={avatarSize}
          className="rounded-full"
        />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className={`text-white/80 ${textSize}`}>{author.username}</span>
        <span className={`text-white/60 ${textSize}`}>
          {formatTime(publishedAt)}
        </span>
      </div>
    </div>
  );
}
