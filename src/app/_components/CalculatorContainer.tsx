// ボタン選択後に表示される計算フォーム
"use client";
import { CALCULATOR_COMPONENTS } from "@/config/calculatorComponents";

export default function CalculatorContainer({
  activeCalc,
}: {
  activeCalc: string;
}) {
  // 設定から対応するコンポーネントを取得
  const Component = CALCULATOR_COMPONENTS[activeCalc];

  // コンポーネントが見つからない場合はデフォルト（BMI）を表示
  if (!Component) {
    const DefaultComponent = CALCULATOR_COMPONENTS["bmi"];
    return DefaultComponent ? <DefaultComponent /> : <div>準備中...</div>;
  }

  return <Component />;
}
