import { ArrowRightIcon, BuildingIcon } from "./svgs";
import {
  GlassCard,
  Badge,
  Button,
  InfoCard,
  DecorativeBlobs,
  Divider,
} from "./ui";
import {
  badgeData,
  titleData,
  descriptionData,
  portfolioButtonData,
  internshipData,
} from "../data";

/**
 * Hero - Hoofdsectie van de stageblog landingspagina
 *
 * Deze component bevat:
 * - Decoratieve achtergrond blobs met glow effect
 * - Glasmorphism kaart met welkomstbericht
 * - Status badge voor de stageperiode
 * - CTA button naar portfolio
 * - Informatie over de stageplaats (Adomate)
 *
 * Data wordt geïmporteerd uit app/data/hero.ts voor makkelijk beheer
 *
 * @example
 * // In page.tsx:
 * <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
 *   <Hero />
 * </div>
 */
const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 mt-24 min-h-screen">
      <DecorativeBlobs />

      <GlassCard className="max-w-3xl mt-2">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge>{badgeData.text}</Badge>
        </div>

        {/* Titel */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-center">
          {titleData.prefix}{" "}
          <span className="bg-linear-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent">
            {titleData.highlight}
          </span>
        </h1>

        {/* Beschrijving */}
        <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 text-center">
          {descriptionData.text}
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Button
            href={portfolioButtonData.href}
            external
            icon={<ArrowRightIcon className="w-5 h-5" />}
          >
            {portfolioButtonData.label}
          </Button>
        </div>

        <div className="mb-8">
          <Divider />
        </div>

        {/* Stageplaats Section */}
        <InfoCard
          title={internshipData.title}
          icon={<BuildingIcon className="w-6 h-6 text-yellow-300" />}
          link={internshipData.link}
        >
          <p>
            Ik doe stage bij{" "}
            <strong className="text-white">{internshipData.companyName}</strong>
            , {internshipData.description}
          </p>
        </InfoCard>
      </GlassCard>
    </div>
  );
};

export default Hero;
