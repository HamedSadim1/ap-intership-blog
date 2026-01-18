import { sanityFetch } from "@/sanity/lib/live";
import { postBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import { formatTime } from "@/utils/time_converter";

// Configure markdown-it with syntax highlighting
const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (error) {
        console.error("Highlight.js error:", error);
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
  });

  if (!post) {
    notFound();
  }

  const markdownContent = md.render(post.body || "");
  console.log("Rendered PublishedAt:", post.published_at);

  return (
    <div className="bg-background relative min-h-screen pt-24 overflow-x-hidden">
      <article className="max-w-3xl mx-auto p-4">
        {post.featured_image && (
          <Image
            src={urlFor(post.featured_image).width(1200).height(600).url()}
            alt={post.title ?? "Post image"}
            width={1200}
            height={600}
            className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
          />
        )}

        <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>

        {post.excerpt && (
          <p className="text-white/70 text-lg mb-6">{post.excerpt}</p>
        )}

        {post.author && (
          <div className="flex items-center gap-3 mb-8">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(48).height(48).url()}
                alt={post.author.username ?? "Author"}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <span className="text-white/80">{post.author.username}</span>
            <span className="text-white/80">
              {formatTime(post.published_at)}
            </span>
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Link
                key={tag._id}
                href={`/blog?tag=${tag.slug?.current}`}
                className="px-3 py-1 rounded-full bg-white/20 text-white text-sm hover:bg-white/30 transition"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownContent }}
        ></div>
      </article>
    </div>
  );
};

export default page;
