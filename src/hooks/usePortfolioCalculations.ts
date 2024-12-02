import { useEffect, useState } from 'react';
import { StockType } from '@/types/portfolio';
import { 
  generatePortfolioWeights, 
  calculatePortfolioSummary,
  debounce 
} from '../utils/calculations';

export const usePortfolioCalculations = (stocks: StockType[]) => {
  const [weights, setWeights] = useState(generatePortfolioWeights(stocks));
  const [summary, setSummary] = useState(calculatePortfolioSummary(stocks));

  useEffect(() => {
    const updateCalculations = debounce(() => {
      setWeights(generatePortfolioWeights(stocks));
      setSummary(calculatePortfolioSummary(stocks));
    }, 300);

    updateCalculations();
  }, [stocks]);

  return {
    weights,
    summary
  };
}; 