// 計算カテゴリ用の型
export type CalculatorType = {
  id: string; // "medication" / "drip" など
  name: string; // "投薬計算"
  iconPath: string; // /icons/light/medication.svg
  color: string; // Tailwindクラス "bg-blue-500" など
};
