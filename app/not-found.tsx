import type { Metadata } from "next";
import { EmptyState, Section } from "./(site)/components/ui";
import { GRADIENTS } from "@/lib/utils/styles";
import { SITE_URL } from "@/lib/constants";
import { NotFoundActions, HelpCard, QuickLinks } from "./(site)/components/not-found";

/**
 * Metadata voor de 404 Not Found pagina
 * Robots worden uitgesloten van indexering — 404 pagina's horen niet in zoekresultaten.
 */
export const metadata: Metadata = {
  title: "Pagina Niet Gevonden | Stage Portfolio",
  description: "De pagina die u zoekt bestaat niet of is verplaatst. Ga terug naar de homepagina of bekijk het blog.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Pagina Niet Gevonden | Stage Portfolio",
    description: "De pagina die u zoekt bestaat niet of is verplaatst.",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Pagina Niet Gevonden | Stage Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pagina Niet Gevonden | Stage Portfolio",
    description: "De pagina die u zoekt bestaat niet of is verplaatst.",
    images: ["/icon.png"],
  },
};

/**
 * 404 Not Found Page — Op maat gemaakte foutpagina
 *
 * Toont een visueel aantrekkelijke 404 pagina met:
 * - Groot gradient 404 nummer
 * - Zoekend icoon
 * - Actieknoppen (Terug naar home, Bekijk blog)
 * - Help sectie met contact e-mail
 * - Snelle links naar populaire pagina's
 *
 * @returns Volledige 404 pagina met navigatie opties
 */
export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center">
      <Section className="py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-12 md:p-16">            {/* 404 Nummer met gradient */}
            <div className="mb-4">
              <h1 className={`text-9xl font-bold bg-clip-text text-transparent ${GRADIENTS.accent}`}>
                404
              </h1>
            </div>

            <EmptyState
              icon="🔍"
              iconSize="text-8xl"
              message="Pagina niet gevonden"
              messageAs="h2"
              hint="Oeps! De pagina die je zoekt bestaat niet of is verplaatst."
              hintClassName="text-lg md:text-xl text-gray-200 leading-relaxed mt-2"
              className="py-0!"
            />

            {/* Actieknoppen */}
            <NotFoundActions />

            {/* Extra informatie */}
            <HelpCard />

            {/* Snelle links */}
            <QuickLinks />
          </div>
        </div>
      </Section>
    </div>
  );
}
