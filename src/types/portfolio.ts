export interface StockRow {
  name: string;
  symbol: string;
  exchange: string;
  purchasePrice: number;
  qty: number;
  investment: number;
  cmp?: number;
  presentValue?: number;
  gainLoss?: number;
}
