export const normalRanges = {
  sodium: {
    label: "ナトリウム",
    unit: "mEq/L",
    min: 135,
    max: 145,
  },
  potassium: {
    label: "カリウム",
    unit: "mEq/L",
    min: 3.5,
    max: 5.0,
  },
  bmi: {
    label: "BMI",
    unit: "",
    min: 18.5,
    max: 24.9, // 日本肥満学会は 25.0 以上を肥満と定義
  },
} as const;
