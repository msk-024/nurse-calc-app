// 患者状態ラベル
export const patientConditions = [
  { value: "normal", label: "通常成人" },
  { value: "elderly", label: "高齢者" },
  { value: "bedsore", label: "褥瘡あり" },
  { value: "postoperative", label: "術後" },
  { value: "burn", label: "熱傷" },
  { value: "critical", label: "重症" },
] as const;
