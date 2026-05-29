import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Site Metadata — Centrale configuratie voor SEO en metadata
 *
 * Pas deze waarden aan om de site metadata te updaten.
 * Wordt gebruikt in layout.tsx als basis voor alle pagina's.
 */

/** Basis site informatie */
export const siteConfig = {
  name: "Stageblog",
  author: "Hamed Sadim",
  url: SITE_URL,
  locale: "nl_BE",
};

/** SEO Keywords */
export const keywords = [
  "stage",
  "stageblog",
  "Adomate",
  "AP Hogeschool",
  "webontwikkeling",
  "Hamed Sadim",
];

/** Beschrijvingen */
export const descriptions = {
  short:
    "Volg mijn stage-ervaring bij Adomate, een AI-ondersteund reclamebureau uit Gent.",
  long: "Volg mijn stage-ervaring bij Adomate, een AI-ondersteund reclamebureau uit Gent. Ontdek mijn uitdagingen, lessen en inzichten tijdens mijn stageperiode vanaf februari 2025.",
};

/**
 * Genereer de basis metadata voor de site
 *
 * Wordt in de root layout geïmporteerd als fallback voor alle pagina's.
 * Elke pagina kan dit overschrijven met eigen generateMetadata() voor specifieke
 * titels, beschrijvingen, canonical URLs en Open Graph data.
 *
 * @returns Metadata object met basis SEO configuratie
 * @see Metadata — Next.js metadata type
 */
export const generateSiteMetadata = (): Metadata => ({
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.author}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: descriptions.long,
  keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.author}`,
    description: descriptions.short,
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.author}`,
    description: descriptions.short,
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
});

/** Geëxporteerde metadata voor gebruik in layout.tsx */
export const siteMetadata = generateSiteMetadata();
