import {
  isMedicationInputs,
  isDripInputs,
  isNutritionInputs,
  isTransfusionInputs,
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
  transfusion: isTransfusionInputs,
} as const;

export type ReusableTypeId = keyof typeof reuseValidators;