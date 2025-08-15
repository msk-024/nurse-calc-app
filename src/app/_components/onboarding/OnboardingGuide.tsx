// "use client";

// import { useEffect, useLayoutEffect, useRef, useState } from "react";

// type Step = {
//   selector: string;
//   title?: string;
//   text: string;
//   padding?: number;
// };
// type Props = {
//   storageKey: string; // 例: "onboarding:home" / "onboarding:history"
//   steps: Step[];
//   enabled?: boolean; // 強制表示したいときに true
//   onFinish?: () => void; // 終了時コールバック
// };

// export default function OnboardingGuide({
//   storageKey,
//   steps,
//   enabled = false,
//   onFinish,
// }: Props) {
//   const [step, setStep] = useState(0);
//   const [visible, setVisible] = useState(false);
//   const [rect, setRect] = useState<{
//     top: number;
//     left: number;
//     width: number;
//     height: number;
//   } | null>(null);

//   // 初回だけ表示（enabled=trueなら常に表示）
//   useEffect(() => {
//     const done = localStorage.getItem(storageKey) === "done";
//     if (!done || enabled) setVisible(true);
//   }, [storageKey, enabled]);

//   // 現ステップの要素位置を測定
//   const compute = () => {
//     const s = steps[step];
//     if (!s) return setRect(null);
//     const el = document.querySelector(s.selector) as HTMLElement | null;
//     if (!el) return setRect(null);
//     const r = el.getBoundingClientRect();
//     const pad = s.padding ?? 8;
//     setRect({
//       top: r.top + window.scrollY - pad,
//       left: r.left + window.scrollX - pad,
//       width: r.width + pad * 2,
//       height: r.height + pad * 2,
//     });
//     // スクロール対象を画面内へ
//     el.scrollIntoView({
//       block: "center",
//       inline: "center",
//       behavior: "smooth",
//     });
//   };

//   useLayoutEffect(() => {
//     if (visible) compute(); /* eslint-disable-next-line */
//   }, [step, visible]);
//   useEffect(() => {
//     if (!visible) return;
//     const onResize = () => compute();
//     const onScroll = () => compute();
//     window.addEventListener("resize", onResize);
//     window.addEventListener("scroll", onScroll, true);
//     return () => {
//       window.removeEventListener("resize", onResize);
//       window.removeEventListener("scroll", onScroll, true);
//     };
//     // eslint-disable-next-line
//   }, [visible, step]);

//   if (!visible || step >= steps.length) return null;

//   const s = steps[step];

//   const finish = () => {
//     setVisible(false);
//     localStorage.setItem(storageKey, "done");
//     onFinish?.();
//   };

//   const skip = () => finish();
//   const prev = () => setStep((v) => Math.max(0, v - 1));
//   const next = () => {
//     if (step === steps.length - 1) finish();
//     else setStep((v) => v + 1);
//   };

//   // キーボード対応（Esc/左右）
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") skip();
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   });

//   return (
//     <div
//       className="fixed inset-0 z-[9999] text-white"
//       aria-modal="true"
//       role="dialog"
//       aria-label="アプリの使い方ガイド"
//     >
//       {/* 暗幕 */}
//       <div className="absolute inset-0 bg-black/70" />

//       {/* くり抜き（outline ハック） */}
//       {rect && (
//         <div
//           aria-hidden="true"
//           style={{
//             position: "absolute",
//             top: rect.top,
//             left: rect.left,
//             width: rect.width,
//             height: rect.height,
//             borderRadius: 12,
//             outline: "9999px solid rgba(0,0,0,0.7)",
//             boxShadow: "0 0 0 2px rgba(255,255,255,0.9) inset",
//             pointerEvents: "none",
//           }}
//         />
//       )}

//       {/* 説明ボックス */}
//       <div className="fixed left-1/2 -translate-x-1/2 bottom-6 w-[min(92vw,720px)]">
//         <div className="bg-white text-gray-900 rounded-2xl p-4 shadow-xl">
//           {s.title && (
//             <h3 className="text-base font-semibold mb-1">{s.title}</h3>
//           )}
//           <p className="text-sm leading-relaxed">{s.text}</p>

//           {/* コントロール */}
//           <div className="mt-4 flex items-center justify-between">
//             <button
//               onClick={skip}
//               className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-4"
//             >
//               スキップ
//             </button>

//             <div className="flex items-center gap-3">
//               {/* ドット進捗 */}
//               <div className="flex gap-1">
//                 {steps.map((_, i) => (
//                   <span
//                     key={i}
//                     className={`h-2 w-2 rounded-full ${
//                       i === step ? "bg-gray-900" : "bg-gray-300"
//                     }`}
//                     aria-hidden="true"
//                   />
//                 ))}
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={prev}
//                   disabled={step === 0}
//                   className="px-3 py-2 text-sm rounded border border-gray-300 disabled:opacity-40"
//                 >
//                   戻る
//                 </button>
//                 <button
//                   onClick={next}
//                   className="px-3 py-2 text-sm rounded bg-gray-900 text-white"
//                 >
//                   {step === steps.length - 1 ? "はじめる" : "次へ"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 背景クリックで次へ（任意） */}
//         {/* <button className="absolute inset-0" onClick={next} aria-label="次へに進む" /> */}
//       </div>
//     </div>
//   );
// }
