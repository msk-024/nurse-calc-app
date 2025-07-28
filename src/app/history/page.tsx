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
      <main className="max-w-md mx-auto p-4">
        <HistoryTabs active={filter} onChange={setFilter} />
        <HistoryList items={filtered} />
      </main>
    </>
  );
}
