// 型ガード群

import type {
  MedicationInputs,
  DripInputs,
  NutritionInputs,
  FluidInputs,
  BsaInputs,
  NaCorrectionInputs,
  KCorrectionInputs,
  TransfusionInputs,
  OxygenInputs,
  BmiInputs,
} from "@/types/inputs";
import { patientConditions } from "@/config/patientConditions";
import type { PatientCondition } from "@/types/patient";

// 共通ユーティリティ
// const isNumber = (v: unknown): v is number =>
//   typeof v === "number" && !Number.isNaN(v);

const isNumberLike = (v: unknown): boolean => {
  if (typeof v === "number") return !Number.isNaN(v);
  if (typeof v === "string") return v.trim() !== "" && !Number.isNaN(Number(v));
  return false;
};

const conditionValues = patientConditions.map(
  (p) => p.value
) as readonly PatientCondition[];
export function isPatientCondition(v: unknown): v is PatientCondition {
  return (
    typeof v === "string" && conditionValues.includes(v as PatientCondition)
  );
}

// 各計算の型ガード
// 投薬
export function isMedicationInputs(v: unknown): v is MedicationInputs {
  const o = v as Partial<MedicationInputs> | null | undefined;
  return (
    !!o &&
    isNumberLike(o.weight) &&
    isNumberLike(o.dose) &&
    isNumberLike(o.concentration)
  );
}

// 点滴
export function isDripInputs(v: unknown): v is DripInputs {
  const o = v as Partial<DripInputs> | null | undefined;
  return (
    !!o &&
    isNumberLike(o.volume) &&
    isNumberLike(o.hours) &&
    isNumberLike(o.dropFactor)
  );
}

// 栄養
export function isNutritionInputs(v: unknown): v is NutritionInputs {
  const o = v as Partial<NutritionInputs> | null | undefined;
  return !!o && isNumberLike(o.weight) && isPatientCondition(o.condition);
}

// 体液バランス
export function isFluidInputs(v: unknown): v is FluidInputs {
  const o = v as Partial<FluidInputs> | null | undefined;
  return !!o && isNumberLike(o.prevWeight) && isNumberLike(o.currWeight);
}

// 体表面積
export function isBsaInputs(v: unknown): v is BsaInputs {
  const o = v as Partial<BsaInputs> | null | undefined;
  return !!o && isNumberLike(o.height) && isNumberLike(o.weight);
}

// 電解質補正（Na）
export function isNaCorrectionInputs(v: unknown): v is NaCorrectionInputs {
  const o = v as Partial<NaCorrectionInputs> | null | undefined;
  return !!o && isNumberLike(o.na) && isNumberLike(o.glucose);
}

// 電解質補正（K）
export function isKCorrectionInputs(v: unknown): v is KCorrectionInputs {
  const o = v as Partial<KCorrectionInputs> | null | undefined;
  return !!o && isNumberLike(o.k) && isNumberLike(o.ph);
}

// 輸血
export function isTransfusionInputs(v: unknown): v is TransfusionInputs {
  const o = v as Partial<TransfusionInputs> | null | undefined;
  return (
    !!o &&
    isNumberLike(o.weight) &&
    isNumberLike(o.currentHb) &&
    isNumberLike(o.targetHb)
  );
}

// 酸素
export function isOxygenInputs(v: unknown): v is OxygenInputs {
  const o = v as Partial<OxygenInputs> | null | undefined;
  return !!o && typeof o.deviceId === "string";
}

// BMI
export function isBmiInputs(v: unknown): v is BmiInputs {
  const o = v as Partial<BmiInputs> | null | undefined;
  return !!o && isNumberLike(o.height) && isNumberLike(o.weight);
}
