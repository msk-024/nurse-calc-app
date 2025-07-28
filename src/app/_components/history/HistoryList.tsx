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
          <div key={item.id} className="flex items-center gap-2">
            {calc && (
              <Image
                src={calc.iconPath}
                alt={calc.name}
                width={20}
                height={20}
              />
            )}
            <div>
              <p className="font-semibold">{calc?.name ?? "不明な計算"}</p>
              <p className="text-xs text-gray-500">{item.resultSummary}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
