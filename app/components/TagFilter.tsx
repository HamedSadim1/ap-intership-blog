import { AllTagsQueryResult } from "@/sanity/types";
import Link from "next/link";

interface TagFilterProps {
  tags: AllTagsQueryResult;
  activeTag?: string | null;
}

const TagFilter = ({ tags, activeTag }: TagFilterProps) => {
  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm mb-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Filter by Tags</h2>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
            !activeTag
              ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-lg"
              : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag._id}
            href={`/blog?tag=${tag.slug?.current}`}
            className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
              activeTag === tag.slug?.current
                ? "bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
