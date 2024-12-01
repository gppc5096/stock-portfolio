import { useLocalStorage } from './useLocalStorage';
import { PortfolioState, StockType, TotalAmountType } from '@/types/portfolio';

const INITIAL_STATE: PortfolioState = {
  totalAmount: {
    amount: 0,
    currency: '원'
  },
  stocks: []
};

export function usePortfolio() {
  const [portfolio, setPortfolio] = useLocalStorage<PortfolioState>('portfolio', INITIAL_STATE);

  const updateTotalAmount = (newAmount: TotalAmountType) => {
    setPortfolio(prev => ({
      ...prev,
      totalAmount: newAmount
    }));
  };

  const addStock = (stock: StockType) => {
    setPortfolio(prev => ({
      ...prev,
      stocks: [...prev.stocks, stock]
    }));
  };

  const deleteStock = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      stocks: prev.stocks.filter(stock => stock.id !== id)
    }));
  };

  const updateStock = (updatedStock: StockType) => {
    setPortfolio(prev => ({
      ...prev,
      stocks: prev.stocks.map(stock => 
        stock.id === updatedStock.id ? updatedStock : stock
      )
    }));
  };

  const importPortfolio = (newPortfolio: PortfolioState) => {
    setPortfolio(newPortfolio);
  };

  const clearPortfolio = () => {
    setPortfolio(INITIAL_STATE);
  };

  return {
    portfolio,
    updateTotalAmount,
    addStock,
    deleteStock,
    updateStock,
    importPortfolio,
    clearPortfolio
  };
} 