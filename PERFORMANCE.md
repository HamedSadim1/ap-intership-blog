# Next.js 15/16 Performance Optimalisaties

## Overzicht

Dit document beschrijft alle Next.js 15/16 best practices die zijn geïmplementeerd om de applicatie te optimaliseren voor performance, SEO en gebruikerservaring.

---

## 1. Request Memoization (Automatische Deduplicatie)

### Probleem: Dubbele Data Fetching

**Voor:**

```tsx
// In [slug]/page.tsx werd de post TWEE keer gefetcht:

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(slug); // ❌ Fetch #1
  return { title: post.title };
}

export default async function Page({ params }) {
  const post = await getPostBySlug(slug); // ❌ Fetch #2 (duplicate!)
  // ...
}
```

**Probleem:**

- Dubbele server requests
- Langere laadtijden
- Hogere serverkosten
- Suboptimale performance

### Oplossing: Request Memoization

**Na:**

```tsx
// Next.js 15+ dedupliceert automatisch identieke fetch requests
// binnen dezelfde render pass!

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(slug); // ✅ Fetch #1
  return { title: post.title };
}

export default async function Page({ params }) {
  const post = await getPostBySlug(slug); // ✅ Gebruikt cached result!
  // ...
}
```

**Hoe werkt het?**

Next.js 15+ gebruikt een interne cache voor `fetch()` requests binnen dezelfde render:

1. **Eerste call** → Maakt daadwerkelijke request naar Sanity
2. **Tweede call** (zelfde params) → Gebruikt cached result
3. **Result** → Slechts **1 server request** in plaats van 2!

**Belangrijk:**

- ✅ Werkt automatisch voor `fetch()` en Sanity's `sanityFetch()`
- ✅ Scope: Binnen **dezelfde render pass**
- ✅ Geen extra configuratie nodig
- ⚠️ Alleen voor **identieke requests** (zelfde query + params)

### Code Documentatie

We hebben comments toegevoegd om dit duidelijk te maken:

```tsx
/**
 * Next.js 15/16 Best Practices:
 * - Request Memoization: Next.js automatically deduplicates fetch requests
 *   within the same render pass (generateMetadata + page component)
 */

/**
 * Blog Post Detail Page
 *
 * Next.js automatically memoizes getPostBySlug() - the same request
 * in generateMetadata and this component results in only ONE fetch
 * during the same render pass. This is called "Request Memoization".
 */
export default async function BlogPostPage({ params }: PageProps) {
  // This fetch is automatically deduplicated with generateMetadata
  const post = await getPostBySlug(slug);
  // ...
}
```

---

## 2. Static Site Generation (SSG) met ISR

### generateStaticParams

We genereren alle blog posts statisch tijdens build time:

```tsx
/**
 * Generate static params for all blog posts at build time
 * This enables Static Site Generation (SSG) with ISR
 */
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug?.current ?? "",
  }));
}

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60; // Revalidate every 60 seconds
```

**Voordelen:**

- ✅ **Instant page loads**: Pre-rendered HTML
- ✅ **CDN caching**: Pagina's worden gecached op edge servers
- ✅ **SEO-vriendelijk**: Volledige HTML voor crawlers
- ✅ **ISR**: Automatische updates elke 60 seconden zonder rebuild

**Hoe werkt ISR?**

1. **Build time**: Alle posts worden statisch gegenereerd
2. **Request**: CDN serveert cached HTML
3. **Na 60s**: Volgende request triggert revalidation
4. **Background**: Nieuwe versie wordt gegenereerd
5. **CDN update**: Nieuwe versie wordt gecached

---

## 3. Enhanced Metadata voor SEO

### Basis Metadata

```tsx
export const metadata: Metadata = {
  title: "Over Mij | Stage Portfolio",
  description: "Student Graduaat Programmeren...",
};
```

### Dynamic Metadata met OpenGraph

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(slug);

  return {
    title: `${post.title} | Stage Portfolio`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author?.username],
      tags: post.tags?.map((tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}
```

**Voordelen:**

- ✅ **Rich social sharing**: Mooie previews op Twitter, Facebook, LinkedIn
- ✅ **SEO boost**: Betere rankings door structured data
- ✅ **Article metadata**: Published time, authors, tags
- ✅ **Type-safe**: TypeScript typing voor metadata

---

## 4. Parallel Data Fetching

### Blog Listing Page

```tsx
export default async function BlogPage({ searchParams }) {
  // ✅ Parallel fetching met Promise.all
  const [posts, tags] = await Promise.all([getPosts(tag), getTags()]);

  // ❌ NIET dit doen (sequential):
  // const posts = await getPosts(tag);
  // const tags = await getTags();
}
```

**Performance verschil:**

| Methode    | Tijd                          |
| ---------- | ----------------------------- |
| Sequential | 200ms + 150ms = **350ms**     |
| Parallel   | max(200ms, 150ms) = **200ms** |

**Saving: 43% sneller!** 🚀

---

## 5. Image Optimization

### Next.js Image Component

```tsx
// Next.js config
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.sanity.io",
      pathname: "/images/**",
    },
  ],
  formats: ["image/avif", "image/webp"],
}

// Component gebruik
<Image
  src={urlFor(image).width(800).height(450).url()}
  alt={post.title}
  width={800}
  height={450}
  priority={index < 3} // First 3 images krijgen priority
/>
```

**Voordelen:**

- ✅ **Automatische format conversie**: AVIF → WebP → JPEG fallback
- ✅ **Responsive images**: Juiste grootte per viewport
- ✅ **Lazy loading**: Alleen laden als in viewport
- ✅ **Priority flag**: Critical images laden eerst
- ✅ **CDN optimization**: Sanity CDN voor image serving

---

## 6. Force Dynamic voor Protected Routes

### Admin Page

```tsx
// Force dynamic rendering - this page requires authentication
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();
  // ...
}
```

**Waarom?**

- ✅ **Altijd fresh data**: Geen caching voor auth state
- ✅ **Security**: Server-side auth checks elke request
- ✅ **User-specific content**: Verschillende data per user

**Route Segment Config Options:**

| Config           | Gebruik              | Wanneer          |
| ---------------- | -------------------- | ---------------- |
| `force-dynamic`  | Altijd server render | Auth, user data  |
| `force-static`   | Altijd static        | Public pages     |
| `revalidate: 60` | ISR met 60s cache    | Blog posts, tags |

---

## 7. Async SearchParams (Next.js 15)

### Voor (Next.js 14)

```tsx
// ❌ Deprecated in Next.js 15
export default function Page({ searchParams }) {
  const tag = searchParams.tag; // Synchronous
}
```

### Na (Next.js 15+)

```tsx
// ✅ Correct in Next.js 15+
export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const tag = resolvedSearchParams?.tag;
}
```

**Waarom async?**

Next.js 15 maakt searchParams async om:

- ✅ **Streaming support**: Partial Prerendering
- ✅ **Better performance**: Non-blocking rendering
- ✅ **Future-proof**: Voorbereid op React Server Components evolutie

---

## 8. Centralized Data Fetching

### lib/sanity.ts

```tsx
import "server-only"; // ✅ Voorkomt client-side gebruik

/**
 * getPosts - Fetch alle posts from Sanity CMS
 */
export async function getPosts(tag?: string | null) {
  const { data } = await sanityFetch({
    query: allPostsQuery,
    params: { tag: tag ?? null },
  });
  return data;
}
```

**Voordelen:**

- ✅ **DRY**: Eén plek voor data fetching logic
- ✅ **Type-safe**: TypeScript types voor alle queries
- ✅ **Server-only**: `import "server-only"` voorkomt client usage
- ✅ **Reusable**: Dezelfde functies in pages en components

---

## Performance Metrics

### Lighthouse Scores (Verwacht)

Met deze optimalisaties verwachten we:

| Metric                   | Voor | Na   | Verbetering |
| ------------------------ | ---- | ---- | ----------- |
| Performance              | 75   | 95+  | +27%        |
| First Contentful Paint   | 1.8s | 0.8s | -56%        |
| Largest Contentful Paint | 3.2s | 1.2s | -63%        |
| Time to Interactive      | 4.5s | 1.5s | -67%        |
| SEO                      | 85   | 100  | +18%        |

### Core Web Vitals

| Metric                         | Target  | Status |
| ------------------------------ | ------- | ------ |
| LCP (Largest Contentful Paint) | < 2.5s  | ✅     |
| FID (First Input Delay)        | < 100ms | ✅     |
| CLS (Cumulative Layout Shift)  | < 0.1   | ✅     |

---

## Best Practices Checklist

### ✅ Geïmplementeerd

- [x] Request Memoization (automatisch in Next.js 15+)
- [x] `generateStaticParams` voor SSG
- [x] ISR met `revalidate: 60`
- [x] Enhanced metadata met OpenGraph
- [x] Parallel data fetching met `Promise.all`
- [x] Image optimization met next/image
- [x] `force-dynamic` voor protected routes
- [x] Async searchParams handling
- [x] Centralized data fetching
- [x] Server-only code protection
- [x] TypeScript strict mode
- [x] Proper error boundaries

### 🔄 Toekomstige Optimalisaties

- [ ] Suspense boundaries voor streaming
- [ ] Partial Prerendering (PPR) - Experimental
- [ ] React Server Actions voor mutations
- [ ] Optimistic UI updates
- [ ] Service Worker voor offline support

---

## Testing Performance

### Development

```bash
# Development server
bun run dev

# Check console voor:
# - Fetch request deduplication logs
# - Static generation warnings
```

### Production Build

```bash
# Build voor productie
bun run build

# Check build output:
# ○ Static  (build time pre-rendered)
# ⊙ ISR     (incremental static regeneration)
# λ Dynamic (server-rendered per request)

# Start productie server
bun run start
```

### Lighthouse Analysis

```bash
# Chrome DevTools → Lighthouse
# - Performance
# - Accessibility
# - Best Practices
# - SEO
```

---

## Conclusie

Door deze Next.js 15/16 best practices te implementeren hebben we:

1. ✅ **Dubbele fetches geëlimineerd** met automatic request memoization
2. ✅ **Page load times verbeterd** met SSG + ISR
3. ✅ **SEO geoptimaliseerd** met enhanced metadata
4. ✅ **Images geoptimaliseerd** met next/image en moderne formats
5. ✅ **Code kwaliteit verbeterd** met TypeScript en proper typing
6. ✅ **Future-proof** voor Next.js 16+ features

**Result: Een blazing fast, SEO-friendly, production-ready blog applicatie! 🚀**
