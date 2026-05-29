import type { Metadata } from "next";
import { BuildingIcon } from "../components/svgs";
import {
  ProfileHeader,
  InfoSection,
  LearningGoalCard,
  ExternalLink,
  ContentParagraphs,
} from "../components/about";
import {
  aboutHeaderData,
  profilePhotoData,
  personalInfoData,
  companyData,
  learningGoalsData,
  contactData,
  linksData,
} from "../data";
import { GLASS_CLASSES, ROUNDED_CLASSES, TRANSITION_CLASSES, HOVER_CLASSES, cn } from "@/lib/utils/styles";
import { SITE_EMAIL, SITE_URL } from "@/lib/constants";
import {
  generatePersonSchema,
  generateBreadcrumbSchema,
} from "@/lib/json-ld";
import { PageHeader, PageLayout } from "../components/ui";

/**
 * Metadata for About page
 * Bevat een profiel-OG type voor betere social weergave.
 */
export const metadata: Metadata = {
  title: "Over Mij | Stage Portfolio",
  description:
    "Student Graduaat Programmeren met passie voor webdevelopment en innovatieve technologieën.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "Over Mij | Stage Portfolio",
    description:
      "Student Graduaat Programmeren met passie voor webdevelopment en innovatieve technologieën.",
    type: "profile",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Over Mij",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Over Mij | Stage Portfolio",
    description:
      "Student Graduaat Programmeren met passie voor webdevelopment en innovatieve technologieën.",
    images: ["/icon.png"],
  },
};

/**
 * About Page — Over mij pagina met persoonlijke informatie
 *
 * Toont een profielfoto, persoonlijke informatie, stagebedrijf details,
 * leerdoelen in een grid, contactgegevens en relevante links.
 * @returns Volledige about pagina met alle secties
 */
export default function AboutPage() {
  return (
    <PageLayout className="pt-28 overflow-clip">
      {/* JSON-LD: Person schema voor de auteur */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generatePersonSchema("Hamed Sadim", {
              jobTitle: "Student Graduaat Programmeren — Stagiair bij Adomate",
              email: SITE_EMAIL,
              url: `${SITE_URL}/about`,
              sameAs: [
                "https://hamedsadim-portfolio.vercel.app/",
              ],
            }),
          ),
        }}
      />
      {/* JSON-LD: BreadcrumbList voor navigatiepad */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { position: 1, name: "Home", item: SITE_URL },
              { position: 2, name: "Over Mij", item: `${SITE_URL}/about` },
            ]),
          ),
        }}
      />
      {/* Header */}
      <PageHeader
        title={aboutHeaderData.title}
        subtitle={aboutHeaderData.subtitle}
        showDivider={false}
      >
        <ProfileHeader
          src={profilePhotoData.src}
          alt={profilePhotoData.alt}
          name={profilePhotoData.name}
          role={profilePhotoData.role}
        />
      </PageHeader>

      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Persoonlijke Info */}
        <InfoSection title={personalInfoData.title}>
          <ContentParagraphs paragraphs={personalInfoData.paragraphs} />
        </InfoSection>

        {/* Stagebedrijf */}
        <InfoSection
          title={companyData.title}
          icon={<BuildingIcon className="w-6 h-6 text-yellow-300" />}
        >
          <p className="text-white/90 leading-relaxed mb-4">
            {companyData.description}
          </p>
          <ExternalLink href={companyData.link.href} external>
            {companyData.link.label}
          </ExternalLink>
        </InfoSection>

        {/* Leerdoelen */}
        <InfoSection title={learningGoalsData.title}>
          <div className="grid md:grid-cols-2 gap-4">
            {learningGoalsData.goals.map((goal, index) => (
              <LearningGoalCard
                key={index}
                title={goal.title}
                description={goal.description}
                icon={goal.icon}
              />
            ))}
          </div>
        </InfoSection>

        {/* Contact */}
        <InfoSection title={contactData.title}>
          <p className="text-white/90 leading-relaxed mb-5">
            {contactData.description}
          </p>
          <a
            href={`mailto:${contactData.email}`}
            className={cn(
              "group inline-flex items-center gap-3 px-6 py-3.5 text-white font-medium cursor-pointer",
              "hover:bg-white/20 hover:border-white/30",
              GLASS_CLASSES.light,
              GLASS_CLASSES.borderLight,
              ROUNDED_CLASSES.lg,
              TRANSITION_CLASSES.mediumEase,
              HOVER_CLASSES.scale,
              HOVER_CLASSES.glow,
            )}
          >
            <span className="text-xl group-hover:scale-110 transition-transform">✉️</span>
            <span>{contactData.email}</span>
          </a>
        </InfoSection>

        {/* Links */}
        <InfoSection title={linksData.title}>
          <div className="flex flex-wrap gap-4">
            {linksData.links.map((link, index) => (
              <ExternalLink
                key={index}
                href={link.href}
                external={link.external}
                variant={link.variant}
              >
                {link.label}
              </ExternalLink>
            ))}
          </div>
        </InfoSection>
      </div>
    </PageLayout>
  );
}
