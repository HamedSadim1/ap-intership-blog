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
  linksData,
} from "../data";

/**
 * Metadata for About page
 */
export const metadata: Metadata = {
  title: "Over Mij | Stage Portfolio",
  description:
    "Student Graduaat Programmeren met passie voor webdevelopment en innovatieve technologieën.",
  openGraph: {
    title: "Over Mij | Stage Portfolio",
    description:
      "Student Graduaat Programmeren met passie voor webdevelopment en innovatieve technologieën.",
    type: "profile",
  },
};

/**
 * About Page - Static content page
 */
export default function AboutPage() {
  return (
    <div className="bg-background relative min-h-screen pt-24 pb-16 overflow-x-hidden">
      {/* Header */}
      <header className="text-center mb-12 px-4">
        <ProfileHeader
          src={profilePhotoData.src}
          alt={profilePhotoData.alt}
          name={profilePhotoData.name}
          role={profilePhotoData.role}
        />

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {aboutHeaderData.title}
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          {aboutHeaderData.subtitle}
        </p>
      </header>

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
          <p className="text-white/80 leading-relaxed mb-4">
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
              />
            ))}
          </div>
        </InfoSection>

        {/* Contact / Links */}
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
    </div>
  );
}
