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
import { GRADIENTS } from "@/lib/utils/styles";


/**
 * Hero - Hoofdsectie van de stageblog landingspagina
 *
 * Deze component bevat:
 * - Decoratieve achtergrond blobs met float animaties + dot grid overlay
 * - Glasmorphism kaart met welkomstbericht en subtiele inner glow
 * - Status badge met pulserende indicator
 * - Gradient titel met staggered entrance animaties
 * - Beschrijving met maximale breedte voor leesbaarheid
 * - CTA button met hover animatie
 * - Stageplaats informatie kaart
 *
 * Data wordt geïmporteerd uit app/data/hero.ts voor makkelijk beheer
 */
const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 pt-28 pb-16 min-h-screen">
      <DecorativeBlobs />

      <GlassCard className="max-w-3xl mt-2 shadow-2xl shadow-purple-500/10">
        {/* Subtiele inner glow overlay */}
        <div className={`absolute inset-0 rounded-3xl pointer-events-none ${GRADIENTS.innerGlow}`} />

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge>{badgeData.text}</Badge>
        </div>

        {/* Titel */}
        <div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight text-center">
            {titleData.prefix}{" "}
            <span className={`bg-clip-text text-transparent ${GRADIENTS.text}`}>
              {titleData.highlight}
            </span>
          </h1>
        </div>

        {/* Beschrijving */}
        <div>
          <p className="text-white/85 leading-relaxed text-center max-w-2xl mx-auto mb-8 text-lg md:text-xl">
            {descriptionData.text}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Button
            href={portfolioButtonData.href}
            external={portfolioButtonData.external}
            variant="secondary"
            icon={<ArrowRightIcon className="w-5 h-5" />}
          >
            {portfolioButtonData.label}
          </Button>
        </div>

        <div className="mb-8">
          <Divider />
        </div>

        {/* Stageplaats Section */}
        <div>
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
        </div>
      </GlassCard>
    </div>
  );
};

export default Hero;
