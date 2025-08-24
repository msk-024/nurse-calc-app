import Image from "next/image";
import { HistoryItem } from "@/types/history";
import { getCalculatorById } from "@/config/calculators";
import { useRouter } from "next/navigation";
// import { setReusePayload } from "@/lib/reuse";

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

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const calc = getCalculatorById(item.typeId);
        return (
          <div
            key={item.id}
            className="flex justify-between items-center gap-2 md:gap-4 p-3 rounded-md bg-white shadow-sm border"
          >
            <div className="flex items-center gap-4">
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
                    {calc?.name ?? "不明な計算"}
                  </p>
                  <p className="text-sm text-gray-800">{item.resultSummary}</p>
                </div>
              </div>
            </div>
            {/* 再利用ボタン */}
            <button
              onClick={() => handleReuse(item)}
              className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
            >
              再利用
            </button>
          </div>
        );
      })}
    </div>
  );
}
