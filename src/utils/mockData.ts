import { Stock, StockHistory } from '../types/stock';

const stocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 173.50,
    change: 2.30,
    changePercent: 1.34,
    volume: 52436789
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.85,
    change: -1.15,
    changePercent: -0.30,
    volume: 23456789
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.80,
    change: 1.80,
    changePercent: 1.28,
    volume: 18234567
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 175.35,
    change: -0.65,
    changePercent: -0.37,
    volume: 31234567
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 202.75,
    change: 5.25,
    changePercent: 2.66,
    volume: 45678901
  }
];

const generateRandomPrice = (basePrice: number): number => {
  const changePercent = (Math.random() - 0.5) * 2; // -1% to +1%
  const change = basePrice * (changePercent / 100);
  return Number((basePrice + change).toFixed(2));
};

export const getStocks = (): Stock[] => {
  return stocks.map(stock => {
    const newPrice = generateRandomPrice(stock.price);
    const priceChange = newPrice - stock.price;
    return {
      ...stock,
      price: newPrice,
      change: Number(priceChange.toFixed(2)),
      changePercent: Number(((priceChange / stock.price) * 100).toFixed(2)),
      volume: stock.volume + Math.floor(Math.random() * 1000000)
    };
  });
};

export const getStockHistory = (symbol: string): StockHistory[] => {
  const history: StockHistory[] = [];
  const basePrice = stocks.find(s => s.symbol === symbol)?.price || 100;
  
  for (let i = 0; i < 24; i++) {
    history.push({
      timestamp: Date.now() - (23 - i) * 3600000,
      price: generateRandomPrice(basePrice)
    });
  }
  
  return history;
};