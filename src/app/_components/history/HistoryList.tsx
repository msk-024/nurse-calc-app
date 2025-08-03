import Image from "next/image";
import { HistoryItem } from "@/types/history";
import { getCalculatorById } from "@/config/calculators";

type HistoryListProps = {
  items: HistoryItem[];
};

export default function HistoryList({ items }: HistoryListProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const calc = getCalculatorById(item.typeId);

        return (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 rounded-md bg-white shadow-sm border"
          >
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
              <div className="flex gap-5 items-center">
                <p className="font-semibold text-sm text-gray-800">
                  {calc?.name ?? "不明な計算"}
                </p>
                <p className="text-sm text-gray-800">{item.resultSummary}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
