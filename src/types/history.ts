// 履歴用の型
export interface HistoryItem {
  id: number;
  typeId: string;
  typeName: string;
  timestamp: string;
  inputs?: Record<string, number | string>;
  result: Record<string, number | string>;
  resultSummary?: string;
}
