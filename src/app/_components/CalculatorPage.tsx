// 履歴再利用のためのページ
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/app/_components/Header";
import CalcNav from "@/app/_components/CalcNav/CalcNav";
import CalculatorContainer from "@/app/_components/CalculatorContainer";

interface CalculatorPageProps {
  initialSub?: "na" | "k";
}

export default function CalculatorPage({ initialSub }: CalculatorPageProps) {
  const params = useParams();
  const typeId = typeof params?.typeId === "string" ? params.typeId : "";

  const [currentCalc, setCurrentCalc] = useState<string>(typeId);

  const [editMode, setEditMode] = useState(false);
  const [subTab, setSubTab] = useState<"na" | "k">(initialSub || "na");
  const toggleEditMode = () => setEditMode((prev) => !prev);

  // ✅ URLパラメータ変更時に再設定
  useEffect(() => {
    if (typeId) setCurrentCalc(typeId);
  }, [typeId]);

  useEffect(() => {
    const payload = localStorage.getItem("reusePayload");
    if (payload) {
      try {
        const parsed = JSON.parse(payload);
        if (parsed?.typeId) setCurrentCalc(parsed.typeId);

        // 電解質ページ以外のみ削除
        if (parsed?.typeId !== "electrolyte") {
          localStorage.removeItem("reusePayload");
        }
      } catch (e) {
        console.error("再利用データの読み込みに失敗:", e);
      }
    }
  }, []);

  useEffect(() => {
    if (initialSub) {
      setSubTab(initialSub);
    }
  }, [initialSub]);

  if (!currentCalc) {
    return (
      <main className="flex items-center justify-center h-screen text-gray-500">
        計算を読み込んでいます...
      </main>
    );
  }

  return (
    <>
      <Header editMode={editMode} onToggleEdit={toggleEditMode} />

      <main className="max-w-6xl mx-auto p-4">
        <CalcNav
          activeCalc={currentCalc}
          onSelect={setCurrentCalc}
          editMode={editMode}
          onToggleEdit={toggleEditMode}
        />

        <div className="mt-6">
          <CalculatorContainer activeCalc={currentCalc} />
        </div>
      </main>
    </>
  );
}
