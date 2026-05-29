/**
 * Shared Configuration Constants
 * Single Source of Truth (SSOT) voor alle hardcoded waarden
 */

// ============================================================
// SITE CONFIGURATION
// ============================================================

/** Site URL — gebruikt voor canonical URLs en metadata base */
export const SITE_URL = "https://stageblog.vercel.app";

/** Site-eigenaar en contact-e-mail */
export const SITE_EMAIL = "hamid.sadim@outlook.com";

// ============================================================
// CONTENT
// ============================================================

/** Aantal dagen waarna een blog-post niet meer als "Nieuw!" wordt gemarkeerd */
export const NEW_POST_DAYS = 7;

/** Maximum aantal tags dat in compacte weergave (BlogCard) wordt getoond */
export const MAX_TAGS_COMPACT = 2;

// ============================================================
// IMAGE DIMENSIONS
// ============================================================

/** Gestandaardiseerde image formaten voor blog posts */
export const IMAGE_DIMENSIONS = {
  /** Hero/featured image op de post detail pagina */
  hero: { width: 1200, height: 675 },
  /** Grid card op de blog listing */
  grid: { width: 800, height: 450 },
  /** Related post card */
  related: { width: 600, height: 338 },
} as const;

/** Sizes attributen voor Next.js Image component */
export const IMAGE_SIZES = {
  hero: "(max-width: 768px) 100vw, 800px",
} as const;

// ============================================================
// ISR (Incremental Static Regeneration)
// ============================================================

/**
 * ISR cache duration in seconden
 *
 * BELANGRIJK: Next.js revalidate vereist een literal value in page files!
 * Gebruik deze constant als documentatie/referentie.
 * In pages moet je: `export const revalidate = 3600;`
 *
 * Waarden per pagina:
 * - Blog listing (blog/page.tsx): 3600 (1 uur fallback)
 * - Blog detail (blog/[slug]/page.tsx): 0 (geen cache, force-dynamic)
 * - Algemene herbruikbare waarde: 5 (documentatie referentie)
 */
export const ISR_REVALIDATE_TIME = 5;

// ============================================================
// SEO / DEFAULT METADATA
// ============================================================

/** Default metadata voor SEO */
export const DEFAULT_METADATA = {
  siteName: "Stage Portfolio",
  siteDescription:
    "Mijn ervaringen, reflecties en groei tijdens de stageperiode",
  blogTitle: "Stage Portfolio Blog",
} as const;
