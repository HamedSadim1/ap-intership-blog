import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "./(site)/data/metadata";
import { SanityLive } from "@/sanity/lib/live";
import { GRADIENTS } from "@/lib/utils/styles";
import {
  generateWebSiteSchema,
  generateOrganizationSchema,
} from "@/lib/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadata wordt geïmporteerd uit app/(site)/data/metadata.ts
 * Dit is de centrale SEO configuratie voor de hele site.
 * @see generateSiteMetadata() in @/app/(site)/data/metadata
 */
export const metadata: Metadata = siteMetadata;

/**
 * Root Layout — Hoogste niveau layout wrapper
 *
 * Initialiseert:
 * - Google Fonts (Geist Sans + Geist Mono)
 * - Globale CSS
 * - Sanity Live preview functionaliteit
 * - Achtergrond gradient via GRADIENTS.brand op <html>
 *
 * @param children - Alle pagina content inclusief site layout en navbar
 * @returns Volledige HTML structuur met fonts, styling en Sanity live updates
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={GRADIENTS.brand}
      data-scroll-behavior="smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* JSON-LD: WebSite — Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema()),
          }}
        />
        {/* JSON-LD: Organization — entity linking voor alle pagina's */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
