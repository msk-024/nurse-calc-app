import type { CalculatorType } from "@/types/calculator";

export const calculators: CalculatorType[] = [
  {
    id: "medication",
    name: "投薬計算",
    iconPath: "/icons/capsules.svg",
    color: "bg-blue-500",
  },
  {
    id: "drip",
    name: "点滴速度",
    iconPath: "/icons/droplet.svg",
    color: "bg-green-500",
  },
  {
    id: "fluid",
    name: "体液バランス",
    iconPath: "/icons/scale-unbalanced.svg",
    color: "bg-orange-500",
  },
  // 追加予定
];

/** IDから計算カテゴリ情報を取得するヘルパー関数 */
export function getCalculatorById(id: string) {
  return calculators.find((c) => c.id === id);
}
