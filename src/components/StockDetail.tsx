import React from 'react';
import { X } from 'lucide-react';
import { Stock, StockHistory } from '../types/stock';
import { StockChart } from './StockChart';
import { formatCurrency, formatVolume } from '../utils/stockUtils';

interface StockDetailProps {
  stock: Stock;
  history: StockHistory[];
  onClose: () => void;
}

export const StockDetail: React.FC<StockDetailProps> = ({ stock, history, onClose }) => {
  const isPositive = stock.change >= 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{stock.name}</h2>
            <p className="text-gray-600">{stock.symbol}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-3xl font-bold">{formatCurrency(stock.price)}</p>
          <p className={`text-lg ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">24 Hour Price History</h3>
          <StockChart data={history} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Volume</p>
            <p className="text-lg font-semibold">{formatVolume(stock.volume)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Market Cap</p>
            <p className="text-lg font-semibold">
              {formatCurrency(stock.price * stock.volume)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};