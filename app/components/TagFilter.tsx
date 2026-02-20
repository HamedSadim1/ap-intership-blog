import { AllTagsQueryResult } from "@/sanity/types";
import Link from "next/link";
import { getTagClassName } from "@/lib/utils/tag-styles";
import { cn, GLASS_CLASSES, ROUNDED_CLASSES } from "@/lib/utils/styles";

interface TagFilterProps {
  tags: AllTagsQueryResult;
  activeTag?: string | null;
}

const TagFilter = ({ tags, activeTag }: TagFilterProps) => {
  return (
    <div className={cn("p-4 mb-6", GLASS_CLASSES.light, ROUNDED_CLASSES.md)}>
      <h2 className="text-xl font-semibold mb-4 text-white">Filter by Tags</h2>
      <div className="flex flex-wrap gap-2">
        <Link href="/blog" className={getTagClassName("large", !activeTag)}>
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag._id}
            href={`/blog?tag=${tag.slug?.current}`}
            className={getTagClassName(
              "large",
              activeTag === tag.slug?.current,
            )}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
