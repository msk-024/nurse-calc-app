// レジストリ

import {
  isMedicationInputs,
  isDripInputs,
  isNutritionInputs,
  isTransfusionInput,
  isFluidInputs,
  isOxygenInputs,
  isBmiInputs,
  isBsaInputs,
} from "../guards";

export const reuseValidators = {
  medication: isMedicationInputs,
  drip: isDripInputs,
  nutrition: isNutritionInputs,
  fluid: isFluidInputs,
  oxygen: isOxygenInputs,
  bsa: isBsaInputs,
  bmi: isBmiInputs,
  transfusion: isTransfusionInput,
} as const;

export type ReusableTypeId = keyof typeof reuseValidators;
