import { authStyles } from "./authStyles";
import { farver } from "./colors";
import { commonStyles } from "./commonStyles";
import { formStyles } from "./formStyles";
import { listStyles } from "./listStyles";

export { farver };

// Én enkel import i skærmene, men styling opdelt efter ansvar.
export const GS = {
  ...commonStyles,
  ...formStyles,
  ...authStyles,
  ...listStyles,
};
