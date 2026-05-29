import type { Metadata } from "next";
import { getPosts, getTags } from "@/lib/sanity";
import TagFilter from "@/app/components/TagFilter";
import type { PageProps } from "@/types";
import { DEFAULT_METADATA, NEW_POST_DAYS, SITE_URL } from "@/lib/constants";
import { BlogCard } from "@/app/(site)/components/blog";
import { GRADIENTS } from "@/lib/utils/styles";
import { EmptyState, PageHeader, PageLayout } from "@/app/(site)/components/ui";
import { generateBreadcrumbSchema } from "@/lib/json-ld";

const SEVEN_DAYS_AGO = Date.now() - NEW_POST_DAYS * 24 * 60 * 60 * 1000;

/**
 * Caching configuratie
 *
 * revalidate: 3600 (1 uur) is een fallback — echte revalidation gebeurt via Sanity webhooks.
 * @see ISR_REVALIDATE_TIME in @/lib/constants
 */
export const revalidate = 3600;

/**
 * Genereer metadata voor de blog overzicht pagina
 *
 * Als er een tag filter actief is, wordt de titel aangepast
 * naar "{tag} Posts | Stage Portfolio Blog".
 *
 * @param searchParams - URL query parameters (tag filter)
 * @returns Dynamische metadata voor de blog listing
 */
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const tag = resolvedSearchParams?.tag as string | undefined;
  const title = tag
    ? `${tag} Posts | ${DEFAULT_METADATA.blogTitle}`
    : DEFAULT_METADATA.blogTitle;
  const description = tag
    ? `Alle artikelen met tag: ${tag}`
    : DEFAULT_METADATA.siteDescription;

  return {
    title,
    description,
    alternates: {
      canonical: tag
        ? `${SITE_URL}/blog?tag=${encodeURIComponent(tag)}`
        : `${SITE_URL}/blog`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: tag
        ? `${SITE_URL}/blog?tag=${encodeURIComponent(tag)}`
        : `${SITE_URL}/blog`,
      images: [
        {
          url: "/icon.png",
          width: 512,
          height: 512,
          alt: DEFAULT_METADATA.blogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/icon.png"],
    },
  };
}

/**
 * Blog Listing Page — Overzicht van alle blog posts met tag filtering
 *
 * Gebruikt Promise.all voor parallel data fetching van posts en tags.
 * Ondersteunt tag filtering via de `tag` query parameter.
 * Toont een lege staat (EmptyState) als er geen posts gevonden zijn.
 *
 * @param searchParams - Next.js page props met optionele `tag` query parameter
 * @returns Blog overzicht met header, tag filter en posts grid
 */
export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const tag = resolvedSearchParams?.tag as string | undefined;

  const [posts, tags] = await Promise.all([
    getPosts(tag || undefined),
    getTags(),
  ]);

  return (
    <PageLayout>
      {/* JSON-LD: BreadcrumbList voor navigatiepad */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { position: 1, name: "Home", item: SITE_URL },
              { position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            ]),
          ),
        }}
      />
      {/* Header Section */}
      <PageHeader
        title={
          <span className={`bg-clip-text text-transparent ${GRADIENTS.text}`}>
            Stage Portfolio
          </span>
        }
        subtitle="Mijn ervaringen, reflecties en groei tijdens de stageperiode"
      />

      {/* Tag Filter */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <TagFilter tags={tags} activeTag={tag} />
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4">
        {posts.length === 0 ? (
          <EmptyState
            icon="🔍"
            message={<>Geen artikelen gevonden{tag ? ` voor tag "${tag}"` : ""}.</>}
            hint="Probeer een andere tag of kom later terug."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => {
              const isNew = post.published_at
                ? new Date(post.published_at).getTime() > SEVEN_DAYS_AGO
                : false;

              return (
                <BlogCard
                  key={post._id}
                  post={post}
                  variant="grid"
                  index={index}
                  isNew={isNew}
                />
              );
            })}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
