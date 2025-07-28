// 栄養計算で使用する患者の状態
export type PatientCondition =
  | "normal" // 通常成人
  | "elderly" // 高齢者
  | "bedsore" // 褥瘡あり
  | "postoperative" // 術後
  | "burn" // 熱傷
  | "critical"; // 重症
