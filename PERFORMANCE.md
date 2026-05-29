# Next.js 16 Performance Optimalisaties

## Overzicht

Dit document beschrijft de performance optimalisaties die zijn geïmplementeerd in deze Next.js 16 applicatie.

---

## 1. Request Memoization (Automatische Deduplicatie)

### Probleem: Dubbele Data Fetching

**Voorheen** werd dezelfde post twee keer gefetched — een keer in `generateMetadata()` en een keer in de page component:

```tsx
// ❌ Voorheen: 2 fetch calls
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(slug); // Fetch #1
  return { title: post.title };
}

export default async function Page({ params }) {
  const post = await getPostBySlug(slug); // Fetch #2 (duplicate!)
}
```

### Oplossing: Request Memoization

Next.js **dedupliceert automatisch** identieke `fetch()` requests binnen dezelfde render pass:

```tsx
// ✅ Na: Next.js 16 memoizes automatisch
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(slug); // Fetch #1 — echte request
  return { title: post.title };
}

export default async function Page({ params }) {
  const post = await getPostBySlug(slug); // ✅ Gebruikt cached result!
  // ...
}
```

**Hoe het werkt:**
1. **Eerste call** → Maakt daadwerkelijke request naar Sanity
2. **Tweede call** (zelfde params) → Gebruikt cached result uit de render pass
3. **Resultaat** → Slechts **1 server request** i.p.v. 2

> Scope: Alleen binnen **dezelfde render pass** — werkt voor `fetch()` en `sanityFetch()`.

---

## 2. Dynamic Rendering (Live Content)

De blog detail pagina gebruikt `force-dynamic` voor **altijd verse data**:

```tsx
// app/(site)/blog/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
```

**Waarom?**
- ✅ Content wordt live beheerd via Sanity CMS
- ✅ Geen caching van blog posts — altijd de nieuwste versie
- Geschikt voor een stageblog waar posts regelmatig wijzigen

### Blog Overzicht (ISR)

De blog listing pagina gebruikt **ISR** met een fallback cache:

```tsx
// app/(site)/blog/page.tsx
export const revalidate = 3600; // 1 uur fallback
```

Sanity webhooks zorgen voor real-time cache invalidatie bij content wijzigingen.

### Route Segment Config

| Configuratie       | Pagina           | Reden                        |
| ------------------ | ---------------- | ---------------------------- |
| `force-dynamic`    | Blog detail      | Altijd verse content         |
| `revalidate: 3600` | Blog overzicht   | ISR fallback (1 uur)         |

---

## 3. Enhanced Metadata voor SEO

### Basis Metadata (Centraal)

```tsx
// app/(site)/data/metadata.ts
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Stageblog | Hamed Sadim", template: "%s | Stageblog" },
  description: descriptions.long,
  openGraph: { type: "website", locale: "nl_BE", siteName: "Stageblog" },
  twitter: { card: "summary_large_image" },
};
```

### Dynamic Metadata per Post

```tsx
// app/(site)/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(slug);

  return {
    title: `${post.title} | Stageblog`,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: canonicalUrl,
      publishedTime: post.published_at,
      authors: [post.author?.username],
      tags: post.tags?.map((t) => t.name),
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
  };
}
```

**Voordelen:**
- ✅ **Rich social sharing** — Mooie previews op Twitter, Facebook, LinkedIn
- ✅ **Canonical URLs** — Voorkomt duplicate content issues
- ✅ **Article metadata** — Published time, authors, tags
- ✅ **Type-safe** — TypeScript typing voor metadata

---

## 4. JSON-LD Gestructureerde Data

Het project gebruikt **JSON-LD** voor rich search results:

| Schema             | Pagina                | Doel                                        |
| ------------------ | --------------------- | ------------------------------------------- |
| `WebSite`          | Root layout           | Sitelinks Search Box in Google              |
| `Organization`     | Root layout           | Entity linking                             |
| `Article`          | Blog detail           | Rich result met headline, image, date      |
| `BreadcrumbList`   | Blog detail, About    | Breadcrumb pad in zoekresultaten           |
| `Person`           | About                 | Auteur info in knowledge panel             |

---

## 5. Parallel Data Fetching

```tsx
// ✅ Blog overzicht: parallel fetchen
const [posts, tags] = await Promise.all([
  getPosts(resolvedSearchParams?.tag as string | undefined),
  getTags(),
]);

// Blog detail: parallel fetchen van post + related
const post = await getPostBySlug(slug);
const [relatedPosts, headings] = await Promise.all([
  getRelatedPosts(post._id, tagSlugs),
  extractHeadings(post.body || ""),
]);
```

**Performance verschil** bij blog overzicht:

| Methode      | Tijd                          |
| ------------ | ----------------------------- |
| Sequential   | 200ms + 150ms = **350ms**     |
| Parallel     | max(200ms, 150ms) = **200ms** |

**Saving: 43% sneller!** 🚀

---

## 6. Image Optimization

```tsx
// next.config.ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    { protocol: "https", hostname: "avatars.githubusercontent.com", pathname: "/u/**" },
  ],
  formats: ["image/avif", "image/webp"],
}
```

**Voordelen:**
- ✅ **Automatische format conversie** — AVIF → WebP → JPEG
- ✅ **Sanity CDN** voor image serving
- ✅ **Responsive images** via `@sanity/image-url`
- ✅ **`priority` prop** voor boven-the-fold afbeeldingen

---

## 7. Gecentraliseerde Data Fetching

```tsx
// lib/sanity.ts — centrale data fetching laag
import "server-only"; // ✅ Voorkomt client-side gebruik

export async function getPosts(tag?: string | null) {
  const { data } = await sanityFetch({
    query: allPostsQuery,
    params: { tag: tag ?? null },
  });
  return data;
}
```

**Voordelen:**
- ✅ **DRY** — Eén plek voor alle Sanity queries
- ✅ **Type-safe** — TypeScript types gegenereerd via `sanity typegen`
- ✅ **Server-only** — `import "server-only"` voorkomt client usage
- ✅ **Request memoization** — Next.js dedupliceert automatisch

---

## 8. Async SearchParams (Next.js 15+)

```tsx
// ✅ Correct: searchParams is async in Next.js 15+
export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const tag = resolvedSearchParams?.tag as string | undefined;
}
```

---

## Performance Metrics

### Verwacht (Lighthouse)

| Metric                   | Schatting |
| ------------------------ | --------- |
| Performance              | 90+       |
| First Contentful Paint   | ~1.0s     |
| Largest Contentful Paint | ~1.5s     |
| SEO                      | 100       |

---

## Best Practices Checklist

### ✅ Geïmplementeerd

- [x] Request Memoization (automatisch in Next.js 16)
- [x] Dynamic rendering voor live content
- [x] ISR voor blog overzicht (3600s fallback)
- [x] Enhanced metadata met Open Graph + Twitter Cards
- [x] JSON-LD gestructureerde data (WebSite, Article, Breadcrumb)
- [x] Parallel data fetching met `Promise.all`
- [x] Image optimization via `next/image` + Sanity CDN
- [x] Async searchParams handling
- [x] Gecentraliseerde data fetching (`lib/sanity.ts`)
- [x] Server-only code protection (`import "server-only"`)
- [x] TypeScript strict mode
- [x] Canonical URLs voor alle pagina's
- [x] Dynamische sitemap (`app/sitemap.ts`)
- [x] Robots.txt (`app/robots.ts`)

### ⚙️ Taint API (Security)

```tsx
// next.config.ts
experimental: {
  taint: true, // Voorkomt dat server-only values naar de client lekken
},
```

De **Taint API** markeert server-only data zodat Next.js een error gooit als deze per ongeluk naar de client wordt gestuurd. Dit is een extra beveiligingslaag bovenop `import "server-only"`.

### 🔄 Toekomstige Optimalisaties

- [ ] Suspense boundaries voor streaming
- [ ] Partial Prerendering (PPR) — Experimental
- [ ] Service Worker voor offline support
- [ ] Font subsetting optimalisatie

---

## Testing Performance

```bash
# Development
bun run dev

# Production build — check route markers:
# ○ Static   (build time pre-rendered)
# ⊙ ISR      (incremental static regeneration)
# λ Dynamic  (server-rendered per request)
bun run build && bun run start

# Lighthouse analyse via Chrome DevTools
```

---

## Conclusie

Deze optimalisaties zorgen voor:

1. ✅ **Snelle laadtijden** — Dynamic rendering + parallel fetching
2. ✅ **SEO optimalisatie** — Enhanced metadata + JSON-LD + canonical URLs
3. ✅ **Live content** — Sanity webhooks + real-time updates
4. ✅ **Code kwaliteit** — TypeScript, centralized fetching, server-only
5. ✅ **Future-proof** — Next.js 16 patterns

**Resultaat:** Een snelle, SEO-vriendelijke blog met live content updates! 🚀
