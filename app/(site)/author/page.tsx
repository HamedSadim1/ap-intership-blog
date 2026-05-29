import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { EmptyState, PageLayout } from "../components/ui";

/**
 * Metadata voor de Author pagina
 * Geeft een duidelijke 404-achtige titel voor dit onbeschikbare pad.
 */
export const metadata: Metadata = {
  title: "Author Pagina | Stage Portfolio",
  description: "Deze pagina is niet beschikbaar voor de stageblog.",
  alternates: {
    canonical: `${SITE_URL}/author`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Author Pagina | Stage Portfolio",
    description: "Deze pagina is niet beschikbaar voor de stageblog.",
    type: "website",
    url: `${SITE_URL}/author`,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Author Pagina | Stage Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Author Pagina | Stage Portfolio",
    description: "Deze pagina is niet beschikbaar voor de stageblog.",
    images: ["/icon.png"],
  },
};

/**
 * Author Page — Tijdelijke pagina voor auteur informatie
 *
 * Toont een eenvoudige melding dat deze pagina niet beschikbaar is
 * voor de stageblog. Gebruikt EmptyState component voor consistente weergave.
 *
 * @returns PageLayout met titel en EmptyState
 */
const AuthorPage = () => {
  return (
    <PageLayout>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center pt-24">
        Author Page
      </h1>
      <EmptyState
        icon="🚧"
        message="Deze pagina is niet beschikbaar voor stage blog."
        className="pt-0!"
      />
    </PageLayout>
  );
};

export default AuthorPage;
