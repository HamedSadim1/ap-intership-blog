/**
 * ProfileHeader Component
 *
 * Herbruikbare component voor het weergeven van profielinformatie met foto.
 * Gecentreerd ontwerp met profielfoto, naam en rol.
 *
 * @example
 * <ProfileHeader
 *   src="/photo.jpg"
 *   alt="Name"
 *   name="John Doe"
 *   role="Developer"
 * />
 */

import Image from "next/image";

interface ProfileHeaderProps {
  src: string;
  alt: string;
  name: string;
  role: string;
}

export function ProfileHeader({ src, alt, name, role }: ProfileHeaderProps) {
  return (
    <div className="mb-6">
      <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 128px, 160px"
          className="rounded-full object-cover border-4 border-white/20 shadow-xl"
          priority
        />
      </div>
      <h2 className="text-xl font-semibold text-white">{name}</h2>
      <p className="text-purple-200 text-sm">{role}</p>
    </div>
  );
}
