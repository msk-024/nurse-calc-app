// ハイライト部分
"use client";
type Rect = { top: number; left: number; width: number; height: number };

export default function GuideHighlight({ rect }: { rect: Rect }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        borderRadius: 12,
        outline: "9999px solid rgba(0,0,0,0.55)",
        boxShadow:
          "0 0 0 3px rgba(255,255,255,0.9) inset, 0 0 12px rgba(255,255,255,0.6)",
        pointerEvents: "none",
        transition: "all 0.3s ease-in-out",
      }}
    />
  );
}
