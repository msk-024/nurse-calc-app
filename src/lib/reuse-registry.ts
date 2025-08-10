// レジストリ

import { isMedicationInputs, isDripInputs, isNutritionInputs } from "./guards";

export const reuseValidators = {
  medication: isMedicationInputs,
  drip: isDripInputs,
  nutrition: isNutritionInputs,
  // fluid: isFluidInputs,
  // oxygen: isOxygenInputs,
  // ...
} as const;

export type ReusableTypeId = keyof typeof reuseValidators;
