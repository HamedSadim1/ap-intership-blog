/**
 * JSON-LD Structured Data Generators
 *
 * Type-safe helper functies voor het genereren van Schema.org gestructureerde data.
 * Alle functies returnen een plain object dat via <script type="application/ld+json">
 * in de server-side HTML wordt geïnjecteerd.
 * Enkel gebruikt in server components — geen client-side hooks.
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 * @see https://schema.org/
 */
import "server-only";

import { SITE_EMAIL, SITE_URL } from "@/lib/constants";

// ============================================================
// Types
// ============================================================

export interface JsonLdPerson {
  "@type": "Person";
  name: string;
  url?: string;
  jobTitle?: string;
  email?: string;
  sameAs?: string[];
}

export interface JsonLdOrganization {
  "@type": "Organization";
  name: string;
  url: string;
  description?: string;
  logo?: string;
  sameAs?: string[];
}

export interface JsonLdBreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

export interface JsonLdArticleInput {
  headline: string;
  description?: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  canonicalUrl: string;
  tags?: string[];
}

// ============================================================
// WebSite — Sitelinks Search Box
// ============================================================

/**
 * Genereer WebSite schema met SearchAction voor Google Sitelinks Search Box.
 *
 * Dit schema MOET op elke pagina staan (root layout) zodat Google een
 * zoekbalk kan tonen in de zoekresultaten voor de site.
 *
 * @returns WebSite JSON-LD object
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stageblog",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?tag={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  } as const;
}

// ============================================================
// Organization — Stagebedrijf / Site-eigenaar
// ============================================================

/**
 * Genereer Organization schema voor de organisatie achter de site.
 *
 * Wordt gebruikt in root layout en als publisher van Article schema's.
 * Bevat eenzelfdeAs array met sociale media links voor entity linking.
 *
 * @param overrides - Optionele overrides voor naam, url, logo, sameAs
 * @returns Organization JSON-LD object
 */
export function generateOrganizationSchema(
  overrides?: Partial<JsonLdOrganization>,
) {
  const defaults: JsonLdOrganization = {
    "@type": "Organization",
    name: "Stageblog",
    url: SITE_URL,
    description: "Stageportfolio van Hamed Sadim — AP Hogeschool",
    logo: `${SITE_URL}/icon.png`,
  };

  return {
    "@context": "https://schema.org",
    ...(Object.assign(defaults, overrides) as JsonLdOrganization),
  };
}

// ============================================================
// Person — Auteur / Over Mij
// ============================================================

/**
 * Genereer Person schema voor de auteur van de blog en de persoon achter de site.
 *
 * Wordt gebruikt in:
 * - About pagina (hoofdschema)
 * - Blog detail pagina (als auteur van Article)
 *
 * @param name - Volledige naam
 * @param options - Optionele eigenschappen (jobTitle, email, sameAs, url)
 * @returns Person JSON-LD object met @context
 */
export function generatePersonSchema(
  name: string,
  options?: {
    jobTitle?: string;
    email?: string;
    sameAs?: string[];
    url?: string;
  },
) {
  const person: JsonLdPerson = {
    "@type": "Person",
    name,
  };

  if (options?.jobTitle) person.jobTitle = options.jobTitle;
  if (options?.email) person.email = options.email;
  if (options?.url) person.url = options.url;
  if (options?.sameAs && options.sameAs.length > 0)
    person.sameAs = options.sameAs;

  return {
    "@context": "https://schema.org",
    ...person,
  };
}

// ============================================================
// Article — Blog Posts
// ============================================================

/**
 * Genereer Article schema voor blog post detail pagina's.
 *
 * Google Rich Results vereist minimaal: headline, image, datePublished, author.
 * De publisher is altijd de Organization van de site.
 *
 * @param input - Article data (headline, description, imageUrl, datePublished, etc.)
 * @returns Article JSON-LD object met @context
 */
export function generateArticleSchema(input: JsonLdArticleInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description || undefined,
    datePublished: input.datePublished,
    dateModified: input.dateModified || input.datePublished,
    author: {
      "@type": "Person",
      name: input.authorName,
      ...(input.authorUrl ? { url: input.authorUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "Stageblog",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.canonicalUrl,
    },
  };

  if (input.imageUrl) {
    schema.image = [input.imageUrl];
  }

  if (input.tags && input.tags.length > 0) {
    schema.keywords = input.tags.join(", ");
  }

  return schema;
}

// ============================================================
// BreadcrumbList — Navigatiepad
// ============================================================

/**
 * Genereer BreadcrumbList schema voor navigatiepaden.
 *
 * Google gebruikt BreadcrumbList voor rich search results met breadcrumbs.
 * De items moeten ten minste 2 levels diep zijn (Home > Huidige pagina).
 *
 * @param items - Array van breadcrumb items met position, name en item (URL)
 * @returns BreadcrumbList JSON-LD object met @context
 *
 * @example
 * generateBreadcrumbSchema([
 *   { position: 1, name: "Home", item: SITE_URL },
 *   { position: 2, name: "Blog", item: `${SITE_URL}/blog` },
 *   { position: 3, name: "Post Title", item: `${SITE_URL}/blog/post-slug` },
 * ])
 */
export function generateBreadcrumbSchema(items: JsonLdBreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: item.item,
    })),
  };
}
