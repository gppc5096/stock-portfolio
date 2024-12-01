import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { darkTheme } from './styles/theme';
import TotalAmount from './components/TotalAmount';
import StockInput from './components/StockInput';
import StockList from './components/StockList';
import PieChart from './components/PieChart';
import PortfolioManager from './components/PortfolioManager';
import { StockType } from './types/portfolio';
import { usePortfolio } from './hooks/usePortfolio';

function App() {
  const {
    portfolio,
    updateTotalAmount,
    addStock,
    deleteStock,
    updateStock,
    importPortfolio
  } = usePortfolio();

  const handleImportStocks = (stocks: StockType[]) => {
    importPortfolio({
      totalAmount: portfolio.totalAmount,
      stocks
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <div className="App">
        <h1>주식 포트폴리오 관리</h1>
        <TotalAmount 
          totalAmount={portfolio.totalAmount} 
          onUpdate={updateTotalAmount} 
        />
        <PortfolioManager 
          stocks={portfolio.stocks}
          onImport={handleImportStocks}
        />
        <StockInput 
          onAddStock={addStock} 
          currency={portfolio.totalAmount.currency} 
        />
        <PieChart stocks={portfolio.stocks} />
        <StockList 
          stocks={portfolio.stocks} 
          onDeleteStock={deleteStock}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
