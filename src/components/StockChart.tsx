import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StockHistory } from '../types/stock';
import { formatCurrency } from '../utils/stockUtils';

interface StockChartProps {
  data: StockHistory[];
}

export const StockChart: React.FC<StockChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={['auto', 'auto']}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={(value: number) => [formatCurrency(value), 'Price']}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};