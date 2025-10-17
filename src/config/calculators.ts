import type { CalculatorType } from "@/types/calculator";

export const calculators: CalculatorType[] = [
  {
    id: "medication",
    name: "投薬計算",
    iconPath: "/icons/capsules.svg",
    color: "bg-yellow-500",
  },
  {
    id: "drip",
    name: "点滴速度",
    iconPath: "/icons/fill-drip.svg",
    color: "bg-blue-500",
  },
  {
    id: "fluid",
    name: "体液バランス",
    iconPath: "/icons/scale-unbalanced.svg",
    color: "bg-green-500",
  },
  {
    id: "nutrition",
    name: "栄養計算",
    iconPath: "/icons/bowl-food.svg",
    color: "bg-amber-500",
  },
  {
    id: "bsa",
    name: "体表面積",
    iconPath: "/icons/hand-holding-droplet.svg",
    color: "bg-purple-500",
  },
  {
    id: "electrolyte",
    name: "電解質補正",
    iconPath: "/icons/fill-drip.svg",
    color: "bg-cyan-500",
  },
  {
    id: "oxygen",
    name: "酸素投与量",
    iconPath: "/icons/stethoscope.svg",
    color: "bg-teal-500",
  },
  {
    id: "transfusion",
    name: "輸血計算",
    iconPath: "/icons/droplet.svg",
    color: "bg-rose-500",
  },
  {
    id: "bmi",
    name: "BMI計算",
    iconPath: "/icons/dumbbell.svg",
    color: "bg-orange-500",
  },
  // 追加予定
];

/** IDから計算カテゴリ情報を取得するヘルパー関数 */
export function getCalculatorById(id: string) {
  return calculators.find((c) => c.id === id);
}
