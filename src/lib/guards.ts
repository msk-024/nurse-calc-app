// 型ガード群

import type {
  MedicationInputs,
  DripInputs,
  NutritionInputs,
} from "@/types/inputs";
import { patientConditions } from "@/config/patientConditions";
import type { PatientCondition } from "@/types/patient";

// 共通ユーティリティ
const isNumber = (v: unknown): v is number =>
  typeof v === "number" && !Number.isNaN(v);

const conditionValues = patientConditions.map(
  (p) => p.value
) as readonly PatientCondition[];
export function isPatientCondition(v: unknown): v is PatientCondition {
  return (
    typeof v === "string" && conditionValues.includes(v as PatientCondition)
  );
}

// 各計算の型ガード
export function isMedicationInputs(v: unknown): v is MedicationInputs {
  const o = v as Partial<MedicationInputs> | null | undefined;
  return (
    !!o && isNumber(o.weight) && isNumber(o.dose) && isNumber(o.concentration)
  );
}

export function isDripInputs(v: unknown): v is DripInputs {
  const o = v as Partial<DripInputs> | null | undefined;
  return (
    !!o && isNumber(o.volume) && isNumber(o.hours) && isNumber(o.dropFactor)
  );
}

export function isNutritionInputs(v: unknown): v is NutritionInputs {
  const o = v as Partial<NutritionInputs> | null | undefined;
  return !!o && isNumber(o.weight) && isPatientCondition(o.condition);
}