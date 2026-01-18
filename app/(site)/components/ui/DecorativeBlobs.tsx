/**
 * Props voor een individuele blob
 * @property className - Tailwind classes voor positie, grootte en kleur
 */
interface BlobProps {
  className?: string;
}

/**
 * Props voor DecorativeBlobs component
 * @property blobs - Array van blob configuraties (optioneel, gebruikt defaults)
 */
interface DecorativeBlobsProps {
  blobs?: BlobProps[];
}

/** Standaard blob configuraties voor de achtergrond */
const defaultBlobs: BlobProps[] = [
  { className: "top-20 left-10 w-72 h-72 bg-white/10" },
  { className: "bottom-20 right-10 w-96 h-96 bg-pink-300/20 delay-1000" },
];

/**
 * DecorativeBlobs - Decoratieve achtergrond elementen met blur en pulse animatie
 * Creëert een moderne, dynamische achtergrond met zwevende glow effecten
 *
 * @example
 * // Met standaard blobs
 * <DecorativeBlobs />
 *
 * @example
 * // Met custom blobs
 * <DecorativeBlobs blobs={[{ className: "top-10 left-20 w-40 h-40 bg-blue-500/20" }]} />
 */
const DecorativeBlobs = ({ blobs = defaultBlobs }: DecorativeBlobsProps) => {
  return (
    <>
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute rounded-full blur-3xl animate-pulse ${blob.className}`}
        />
      ))}
    </>
  );
};

export default DecorativeBlobs;
