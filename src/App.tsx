import React, { useState, useEffect } from 'react';
import { Stock, StockHistory } from './types/stock';
import { getStocks, getStockHistory } from './utils/mockData';
import { calculateMarketSummary } from './utils/stockUtils';
import { StockCard } from './components/StockCard';
import { StockDetail } from './components/StockDetail';
import { SearchBar } from './components/SearchBar';
import { MarketOverview } from './components/MarketOverview';

function App() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [stockHistory, setStockHistory] = useState<StockHistory[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const newStocks = getStocks();
      setStocks(newStocks);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleStockClick = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
      setStockHistory(getStockHistory(symbol));
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const marketSummary = calculateMarketSummary(stocks);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Real-Time Stock Market</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <MarketOverview summary={marketSummary} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              onClick={handleStockClick}
            />
          ))}
        </div>

        {selectedStock && (
          <StockDetail
            stock={selectedStock}
            history={stockHistory}
            onClose={() => setSelectedStock(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;