// 入力の型定義

// 投薬
export type MedicationInputs = {
  weight: number;
  dose: number;
  concentration: number;
};

// 点滴
export type DripInputs = {
  volume: number;
  hours: number;
  dropFactor: number;
};

// 栄養
export type NutritionInputs = {
  weight: number;
  condition: import("./patient").PatientCondition;
};

// …必要に応じて他の計算も追加
