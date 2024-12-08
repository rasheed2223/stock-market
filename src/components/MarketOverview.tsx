import React from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { MarketSummary } from '../types/stock';
import { formatVolume } from '../utils/stockUtils';

interface MarketOverviewProps {
  summary: MarketSummary;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="text-indigo-500" />
          <h3 className="font-semibold">Market Volume</h3>
        </div>
        <p className="text-2xl font-bold">{formatVolume(summary.totalVolume)}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="text-green-500" />
          <h3 className="font-semibold">Top Gainer</h3>
        </div>
        {summary.topGainer && (
          <div>
            <p className="font-bold">{summary.topGainer.symbol}</p>
            <p className="text-green-500">+{summary.topGainer.changePercent.toFixed(2)}%</p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="text-red-500" />
          <h3 className="font-semibold">Top Loser</h3>
        </div>
        {summary.topLoser && (
          <div>
            <p className="font-bold">{summary.topLoser.symbol}</p>
            <p className="text-red-500">{summary.topLoser.changePercent.toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};