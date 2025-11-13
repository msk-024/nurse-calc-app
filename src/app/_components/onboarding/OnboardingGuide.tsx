// 初回説明（段階的なオンボーディング）
"use client";

import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import GuideHighlight from "./GuideHighlight";
import GuideOverlay from "./GuideOverlay";
import GuideContent from "./GuideContent";

type Step = {
  selector: string;
  title?: string;
  text: string;
  padding?: number;
};

type Props = {
  storageKey: string;
  steps: Step[];
  enabled?: boolean;
  onFinish?: () => void;
};

export default function OnboardingGuide({
  storageKey,
  steps,
  enabled = false,
  onFinish,
}: Props) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  // 初回のみ表示
  useEffect(() => {
    const done = localStorage.getItem(storageKey) === "done";
    if (!done || enabled) setVisible(true);
  }, [storageKey, enabled]);

  // ❗ compute を useCallback で固定化
  const compute = useCallback(() => {
    const s = steps[step];
    if (!s) return setRect(null);
    const el = document.querySelector(s.selector) as HTMLElement | null;
    if (!el) return setRect(null);
    const r = el.getBoundingClientRect();
    const pad = s.padding ?? 8;
    setRect({
      top: r.top + window.scrollY - pad,
      left: r.left + window.scrollX - pad,
      width: r.width + pad * 2,
      height: r.height + pad * 2,
    });
    el.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth",
    });
  }, [steps, step]);

  useLayoutEffect(() => {
    if (visible) compute();
  }, [visible, compute]);

  useEffect(() => {
    if (!visible) return;
    const handleResize = () => compute();
    const handleScroll = () => compute();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [visible, compute]);

  // ❗ next / skip / prev / finish を useCallback 化
  const finish = useCallback(() => {
    setVisible(false);
    localStorage.setItem(storageKey, "done");
    onFinish?.();
  }, [storageKey, onFinish]);

  const skip = useCallback(() => finish(), [finish]);

  const prev = useCallback(() => setStep((v) => Math.max(0, v - 1)), []);

  const next = useCallback(() => {
    if (step === steps.length - 1) finish();
    else setStep((v) => v + 1);
  }, [step, steps.length, finish]);

  // キーボード対応
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, skip, next, prev]);

  if (!visible || step >= steps.length) return null;
  const s = steps[step];

  return (
    <div className="fixed inset-0 z-[9999]" aria-modal="true" role="dialog">
      <GuideOverlay />
      {rect && <GuideHighlight rect={rect} />}
      <GuideContent
        step={step}
        steps={steps}
        s={s}
        onNext={next}
        onPrev={prev}
        onSkip={skip}
      />
    </div>
  );
}
