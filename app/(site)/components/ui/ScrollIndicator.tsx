/**
 * ScrollIndicator - Geanimeerde scroll indicator onderaan de pagina
 * Toont een bounce animatie om gebruikers te laten weten dat ze kunnen scrollen
 * Wordt automatisch gecentreerd en gepositioneerd onderaan het scherm
 *
 * @example
 * <div className="relative min-h-screen">
 *   <content />
 *   <ScrollIndicator />
 * </div>
 */
const ScrollIndicator = () => {
  return (
    // Container met absolute positionering en bounce animatie
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
        <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default ScrollIndicator;
