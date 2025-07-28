import type { PatientCondition } from "@/types/patient";

export const nutritionFactors: Record<
  PatientCondition,
  {
    energy: number; // kcal/kg
    protein: number; // g/kg
    water: number; // mL/kg
  }
> = {
  normal: {
    energy: 30,
    protein: 1.0,
    water: 35,
  },
  elderly: {
    energy: 25,
    protein: 1.0,
    water: 30,
  },
  bedsore: {
    energy: 35,
    protein: 1.5,
    water: 40,
  },
  postoperative: {
    energy: 35,
    protein: 1.5,
    water: 40,
  },
  burn: {
    energy: 40,
    protein: 2.0,
    water: 50,
  },
  critical: {
    energy: 35,
    protein: 2.0,
    water: 40,
  },
};
