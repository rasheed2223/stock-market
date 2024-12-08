import { Stock, MarketSummary } from '../types/stock';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const formatVolume = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

export const calculateMarketSummary = (stocks: Stock[]): MarketSummary => {
  const summary: MarketSummary = {
    totalVolume: 0,
    gainers: 0,
    losers: 0,
    topGainer: null,
    topLoser: null,
  };

  stocks.forEach(stock => {
    summary.totalVolume += stock.volume;
    
    if (stock.change > 0) {
      summary.gainers++;
      if (!summary.topGainer || stock.changePercent > summary.topGainer.changePercent) {
        summary.topGainer = stock;
      }
    } else {
      summary.losers++;
      if (!summary.topLoser || stock.changePercent < summary.topLoser.changePercent) {
        summary.topLoser = stock;
      }
    }
  });

  return summary;
};