// （説明＋ボタン）
"use client";

type Step = {
  selector: string;
  title?: string;
  text: string;
  padding?: number;
};

type Props = {
  step: number;
  steps: Step[];
  s: Step;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
};

export default function GuideContent({
  step,
  steps,
  s,
  onNext,
  onPrev,
  onSkip,
}: Props) {
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 w-[min(92vw,720px)]">
      <div className="bg-white text-gray-900 rounded-2xl p-4 shadow-xl">
        {s.title && <h3 className="text-base font-semibold mb-1">{s.title}</h3>}
        <p className="text-sm leading-relaxed">{s.text}</p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-4"
          >
            スキップ
          </button>

          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === step ? "bg-gray-900" : "bg-gray-300"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onPrev}
                disabled={step === 0}
                className="px-3 py-2 text-sm rounded border border-gray-300 disabled:opacity-40"
              >
                戻る
              </button>
              <button
                onClick={onNext}
                className="px-3 py-2 text-sm rounded bg-gray-900 text-white"
              >
                {step === steps.length - 1 ? "はじめる" : "次へ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
