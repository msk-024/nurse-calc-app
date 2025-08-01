// 酸素投与デバイス
import type { OxygenDevice } from "@/types/oxygenDevice";

export const oxygenDevices: OxygenDevice[] = [
  {
    id: "room_air",
    name: "室内気（大気）",
    flowRange: "-",
    fio2Range: "約21%",
    estimatedFiO2: 21,
  },
  {
    id: "nasal_cannula",
    name: "鼻カニュラ",
    flowRange: "1〜6 L/min",
    fio2Range: "約24〜44%",
    estimateFiO2Function: (flow: number) => Math.min(24 + (flow - 1) * 4, 44), // 1L 24%, +4%/L
  },
  {
    id: "simple_mask",
    name: "シンプルマスク",
    flowRange: "5〜10 L/min",
    fio2Range: "約40〜60%",
    estimatedFiO2: 50, // 中間値
  },
  {
    id: "reservoir_mask",
    name: "リザーバーマスク",
    flowRange: "10〜15 L/min",
    fio2Range: "約60〜90%",
    estimatedFiO2: 80, // 中間値
  },
  {
    id: "venturi_mask",
    name: "ベンチュリーマスク",
    flowRange: "固定",
    fio2Range: "24〜50%",
    estimatedFiO2: 40,
  },
  {
    id: "hfnc",
    name: "高流量鼻カニュラ（HFNC）",
    flowRange: "最大60 L/min",
    fio2Range: "21〜100%",
    estimatedFiO2: 90,
  },
];

// 推定式（簡易的な目安） PaO2 ≒ SpO2 * 1.25
export const estimatePaO2 = (spo2: number) => (spo2 >= 90 ? (spo2 - 30) * 1.5 : null);
