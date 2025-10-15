"use client";
import { useState, useEffect } from "react";
import Header from "@/app/_components/Header";
import HistoryTabs from "@/app/_components/history/HistoryTabs";
import HistoryList from "@/app/_components/history/HistoryList";
import { loadHistory } from "@/lib/history";
import type { HistoryItem } from "@/types/history";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const filtered =
    filter === "all"
      ? history
      : history.filter((item) => item.typeId === filter);

  return (
    <>
      <Header title="履歴" />
      <main className="max-w-4xl mt-4 mx-auto px-4 pt-6 pb-16 bg-gray-50 min-h-screen rounded-t-3xl">
        <HistoryTabs active={filter} onChange={setFilter} />
        <div className="mt-4">
          <HistoryList items={filtered} />
        </div>
      </main>
    </>
  );
}
