// 酸素投与デバイスの型
export type OxygenDevice = {
  id: string;
  name: string;
  flowRange: string;
  fio2Range: string;
  estimatedFiO2?: number;
  estimateFiO2Function?: (flow: number) => number;
};
