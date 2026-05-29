import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import Hero from "./components/hero";
import { generateBreadcrumbSchema } from "@/lib/json-ld";

/**
 * Metadata voor de home/pagina
 * SEO optimalisatie met Open Graph tags voor social sharing
 */
export const metadata: Metadata = {
  title: "Stage Portfolio | Home",
  description:
    "Welkom op mijn stage portfolio. Ontdek mijn ervaringen, projecten en groei tijdens mijn stage.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Stage Portfolio",
    description:
      "Welkom op mijn stage portfolio. Ontdek mijn ervaringen, projecten en groei tijdens mijn stage.",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Stage Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stage Portfolio | Home",
    description:
      "Welkom op mijn stage portfolio. Ontdek mijn ervaringen, projecten en groei tijdens mijn stage.",
    images: ["/icon.png"],
  },
};

/**
 * Home Page — Landingspagina van de stageblog
 *
 * Toont de Hero component met:
 * - Decoratieve achtergrond (blobs + dot grid)
 * - Glasmorphism kaart met welkomstbericht
 * - CTA button naar blog
 * - Stageplaats informatie
 *
 * @returns Volledige home page sectie met achtergrond en hero content
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-clip flex flex-col">
      {/* JSON-LD: BreadcrumbList voor navigatiepad */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { position: 1, name: "Home", item: SITE_URL },
            ]),
          ),
        }}
      />
      <Hero />
    </div>
  );
}
