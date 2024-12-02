import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { PortfolioState, StockType, TotalAmountType } from '@/types/portfolio';

export const INITIAL_STATE: PortfolioState = {
  totalAmount: {
    amount: 0,
    currency: '원화'
  },
  stocks: []
};

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useLocalStorage<PortfolioState>('portfolio', INITIAL_STATE);

  const updateTotalAmount = (totalAmount: TotalAmountType) => {
    setPortfolio(prev => ({
      ...prev,
      totalAmount
    }));
  };

  const resetPortfolio = () => {
    setPortfolio(INITIAL_STATE);
    // 로컬 스토리지도 초기화
    localStorage.setItem('portfolio', JSON.stringify(INITIAL_STATE));
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

  return {
    portfolio,
    updateTotalAmount,
    addStock,
    deleteStock,
    updateStock,
    importPortfolio,
    resetPortfolio
  };
}; 