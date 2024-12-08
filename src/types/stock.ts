export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export interface StockHistory {
  timestamp: number;
  price: number;
}

export interface MarketSummary {
  totalVolume: number;
  gainers: number;
  losers: number;
  topGainer: Stock | null;
  topLoser: Stock | null;
}