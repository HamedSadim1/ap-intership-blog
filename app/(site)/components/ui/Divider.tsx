/**
 * Divider - Horizontale scheidingslijn met gradient effect
 * Vervaagt naar beide kanten voor een subtiele visuele scheiding
 *
 * @example
 * <div className="mb-8">
 *   <Divider />
 * </div>
 */
import { GRADIENTS } from "@/lib/utils/styles";

const Divider = () => {
  return (
    // Gradient lijn: transparant -> wit -> transparant
    <div className={`w-full h-px ${GRADIENTS.divider}`} />
  );
};

export default Divider;
