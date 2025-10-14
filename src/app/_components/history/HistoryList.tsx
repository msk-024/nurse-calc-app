import Image from "next/image";
import { HistoryItem } from "@/types/history";
import { getCalculatorById } from "@/config/calculators";
import { useRouter } from "next/navigation";
import { normalRanges } from "@/config/normalRanges";
import { ArrowUp, ArrowDown } from "lucide-react";

type HistoryListProps = {
  items: HistoryItem[];
};

export default function HistoryList({ items }: HistoryListProps) {
  const router = useRouter();
  const handleReuse = (item: HistoryItem) => {
    if (!item.inputs) return; // 念のため
    // localStorageに保存（型情報はstringで統一）
    localStorage.setItem(
      "reusePayload",
      JSON.stringify({
        typeId: item.typeId,
        sub: item.sub, // Na/K切り替えが必要なもの
        inputs: item.inputs,
        timestamp: item.timestamp,
      })
    );
    router.push(`/${item.typeId}`);
  };

  // ✅ 基準値判定関数（ResultBoxと同様）
  const getStatusIcon = (
    value: number,
    range?: { min: number; max: number }
  ) => {
    if (!range) return null;
    if (value > range.max)
      return <ArrowUp className="w-4 h-4 text-red-500 ml-1" />;
    if (value < range.min)
      return <ArrowDown className="w-4 h-4 text-blue-500 ml-1" />;
    return null;
  };

  // ✅ 計算タイプごとに対応する範囲を決定
  const getRangeForItem = (item: HistoryItem) => {
    if (item.typeId === "electrolyte" && item.sub === "na")
      return normalRanges.sodium;
    if (item.typeId === "electrolyte" && item.sub === "k")
      return normalRanges.potassium;
    if (item.typeId === "bmi") return normalRanges.bmi;
    return undefined;
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const calc = getCalculatorById(item.typeId);
        const range = getRangeForItem(item);

        // ✅ 結果数値を抽出(型安全含む)
        const valueMatch = item.resultSummary
          ? item.resultSummary.match(/([\d.]+)/)
          : null;
        const value =
          valueMatch && valueMatch[1] ? parseFloat(valueMatch[1]) : undefined;
        return (
          <div
            key={item.id}
            className="flex justify-between items-center gap-2 md:gap-4 p-3 rounded-md bg-white shadow-sm border"
          >
            <div className="flex items-center gap-4 w-3/4">
              {calc && (
                <Image
                  src={calc.iconPath}
                  alt={calc.name}
                  width={24}
                  height={24}
                  className="shrink-0"
                />
              )}
              <div className="flex flex-col">
                <p className="text-xs text-gray-700">{item.timestamp}</p>
                <div className="flex flex-col gap-1 items-start mt-1 md:flex-row md:gap-4 md:items-center md:mt-0">
                  <p className="font-semibold text-sm text-gray-800">
                    {item.typeId === "electrolyte"
                      ? item.sub === "k"
                        ? "K補正"
                        : item.sub === "na"
                        ? "Na補正"
                        : "電解質補正"
                      : calc?.name ?? "不明な計算"}
                  </p>
                  <p className="text-sm text-gray-800 flex items-center">
                    {item.resultSummary ?? "—"}
                    {value !== undefined &&
                      range &&
                      getStatusIcon(value, range)}
                  </p>
                </div>
              </div>
            </div>
            {/* 再利用ボタン */}
            <button
              onClick={() => handleReuse(item)}
              className="w-1/5 text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
            >
              再利用
            </button>
          </div>
        );
      })}
    </div>
  );
}
