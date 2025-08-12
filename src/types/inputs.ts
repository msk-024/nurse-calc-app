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

// 体液バランス
export type FluidInputs = {
  prevWeight:number;
  currWeight:number;
  oralIntake?:number;
  ivIntake?:number;
  urineOutput?:number;
  otherOutput?:number;
};

// 体表面積
export type BsaInputs = {
  weight: number;
  height: number;
};
// 電解質補正
export type NaCorrectionInputs = { na: number; glucose: number; };
export type KCorrectionInputs = { k: number; ph: number; };

// 輸血
export type TransfusionInputs = {
weight:number; currentHb:number; targetHb:number;
};
// 酸素
export type OxygenInputs = {
deviceId:string; flow?:number;
};
// BMI
export type BmiInputs = {
  weight: number;
  height: number;
};