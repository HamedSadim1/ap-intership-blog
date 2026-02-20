/**
 * Shared Configuration Constants
 * Centrale locatie voor herbruikbare configuratie-waarden
 */

/**
 * ISR (Incremental Static Regeneration) configuratie
 * - Cache duration in seconden
 *
 * BELANGRIJK: Next.js revalidate vereist een literal value in page files!
 * Gebruik deze constant als documentatie/referentie.
 * In pages moet je: export const revalidate = 5;
 * 
 * 5 seconden is optimal voor snelle updates zonder performance issues
 */
export const ISR_REVALIDATE_TIME = 5; // 5 seconden

/**
 * Default metadata waarden
 */
export const DEFAULT_METADATA = {
  siteName: "Stage Portfolio",
  siteDescription:
    "Mijn ervaringen, reflecties en groei tijdens de stageperiode",
  blogTitle: "Stage Portfolio Blog",
} as const;
