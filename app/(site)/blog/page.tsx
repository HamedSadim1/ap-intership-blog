import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery, allTagsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

import Image from "next/image";
import Filtering from "@/app/components/Filtering";

interface PageProps {
  searchParams: Promise<{ tag?: string }>;
}

const page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const tag = resolvedSearchParams.tag ?? null;

  const [{ data: posts }, { data: tags }] = await Promise.all([
    sanityFetch({ query: allPostsQuery, params: { tag } }),
    sanityFetch({ query: allTagsQuery }),
  ]);

  return (
    <div className="bg-background relative min-h-screen pt-24 overflow-x-hidden">
      <h1 className="text-3xl font-bold underline text-center text-white">
        Blog Pagina
      </h1>

      <div className="max-w-3xl mx-auto p-4">
        <Filtering tags={tags} activeTag={tag} />
      </div>

      <div className="flex gap-2 max-w-3xl mx-auto p-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className=" mb-8 shadow-xl  rounded-lg overflow-hidden"
          >
            {post.featured_image && (
              <Image
                src={urlFor(post.featured_image).width(800).height(400).url()}
                alt={post.title ?? "Post image"}
                width={800}
                height={400}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <a
                href={`/blog/${post.slug?.current}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
