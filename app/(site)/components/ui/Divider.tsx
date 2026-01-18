/**
 * Divider - Horizontale scheidingslijn met gradient effect
 * Vervaagt naar beide kanten voor een subtiele visuele scheiding
 *
 * @example
 * <div className="mb-8">
 *   <Divider />
 * </div>
 */
const Divider = () => {
  return (
    // Gradient lijn: transparant -> wit -> transparant
    <div className="w-full h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
  );
};

export default Divider;
