import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types/stock';
import { formatCurrency, formatVolume } from '../utils/stockUtils';

interface StockCardProps {
  stock: Stock;
  onClick: (symbol: string) => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  const isPositive = stock.change >= 0;

  return (
    <div
      onClick={() => onClick(stock.symbol)}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{stock.symbol}</h3>
          <p className="text-sm text-gray-600">{stock.name}</p>
        </div>
        {isPositive ? (
          <TrendingUp className="text-green-500" />
        ) : (
          <TrendingDown className="text-red-500" />
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{formatCurrency(stock.price)}</p>
        <div className="flex items-center mt-1">
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Volume: {formatVolume(stock.volume)}
        </p>
      </div>
    </div>
  );
};