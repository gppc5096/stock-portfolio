import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { darkTheme } from './styles/theme';
import TotalAmount from './components/TotalAmount';
import StockInput from './components/StockInput';
import StockList from './components/StockList';
import PieChart from './components/PieChart';
import PortfolioManager from './components/PortfolioManager';
import { StockType } from './types/portfolio';
import { useState, useEffect } from 'react';

function App() {
  const [stocks, setStocks] = useState<StockType[]>([]);

  useEffect(() => {
    const savedStocks = localStorage.getItem('stocks');
    if (savedStocks) {
      setStocks(JSON.parse(savedStocks));
    }
  }, []);

  const handleAddStock = (newStock: StockType) => {
    setStocks(prevStocks => {
      const updatedStocks = [...prevStocks, newStock];
      localStorage.setItem('stocks', JSON.stringify(updatedStocks));
      return updatedStocks;
    });
  };

  const handleDeleteStock = (id: string) => {
    setStocks(prevStocks => {
      const updatedStocks = prevStocks.filter(stock => stock.id !== id);
      localStorage.setItem('stocks', JSON.stringify(updatedStocks));
      return updatedStocks;
    });
  };

  const handleImportStocks = (importedStocks: StockType[]) => {
    setStocks(importedStocks);
    localStorage.setItem('stocks', JSON.stringify(importedStocks));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <div className="App">
        <h1>주식 포트폴리오 관리</h1>
        <TotalAmount />
        <PortfolioManager stocks={stocks} onImport={handleImportStocks} />
        <StockInput onAddStock={handleAddStock} />
        <PieChart stocks={stocks} />
        <StockList stocks={stocks} onDeleteStock={handleDeleteStock} />
      </div>
    </ThemeProvider>
  );
}

export default App;
