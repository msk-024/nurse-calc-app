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
const isNumberLike = (v: unknown): boolean => {
  if (typeof v === "number") return !Number.isNaN(v);
  if (typeof v === "string") return v.trim() !== "" && !Number.isNaN(Number(v));
  return false;
};

// 各計算の型ガード
// 投薬
export function isMedicationInputs(v: unknown): v is MedicationInputs {
  const o = v as Partial<MedicationInputs> | null | undefined;
  return (
    !!o && isNumber(o.weight) && isNumber(o.dose) && isNumber(o.concentration)
  );
}
// 点滴
export function isDripInputs(v: unknown): v is DripInputs {
  const o = v as Partial<DripInputs> | null | undefined;
  return (
    !!o && isNumber(o.volume) && isNumber(o.hours) && isNumber(o.dropFactor)
  );
}
// 栄養
export function isNutritionInputs(v: unknown): v is NutritionInputs {
  const o = v as Partial<NutritionInputs> | null | undefined;
  return !!o && isNumber(o.weight) && isPatientCondition(o.condition);
}
// 体液バランス
export function isFluidInputs(v: unknown): v is FluidInputs {
  const o = v as Partial<FluidInputs> | null | undefined;
  return !!o && isNumber(o.prevWeight) && isNumber(o.currWeight);
}
// 体表
export function isBsaInputs(v: unknown): v is BsaInputs {
  const o = v as Partial<BsaInputs> | null | undefined;
  return !!o && isNumber(o.height) && isNumber(o.weight);
}
// 電解質
export function isNaCorrectionInputs(v: unknown): v is NaCorrectionInputs {
  const o = v as Partial<NaCorrectionInputs> | null | undefined;
  return !!o && isNumber(o.na) && isNumber(o.glucose);
}

// export function isKCorrectionInputs(v: unknown): v is KCorrectionInputs {
//   const o = v as Partial<KCorrectionInputs> | null | undefined;
//   return !!o && isNumberLike(o.k) && isNumberLike(o.ph);
// }
export function isKCorrectionInputs(v: unknown): v is KCorrectionInputs {
  const o = v as Partial<KCorrectionInputs> | null | undefined;
  const isK = isNumberLike(o?.k);
  const isPh = isNumberLike(o?.ph);
  const result = !!o && isK && isPh;
  console.log("🧪 isKCorrectionInputs チェック", {
    v,
    k: o?.k,
    ph: o?.ph,
    isK: isNumber(o?.k),
    isPh: isNumber(o?.ph),
    result,
  });
  return result;
}



// 輸血
export function isTransfusionInput(v: unknown): v is TransfusionInputs {
  const o = v as Partial<TransfusionInputs> | null | undefined;
  return (
    !!o && isNumber(o.weight) && isNumber(o.currentHb) && isNumber(o.targetHb)
  );
}
// 酸素
export function isOxygenInputs(v: unknown): v is OxygenInputs {
  const o = v as Partial<OxygenInputs> | null | undefined;
  return !!o && typeof o.deviceId === "string"; // flowは任意
}
// BMI
export function isBmiInputs(v: unknown): v is BmiInputs {
  const o = v as Partial<BmiInputs> | null | undefined;
  return !!o && isNumber(o.height) && isNumber(o.weight);
}
