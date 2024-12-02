import { StockType } from '@/types/portfolio';

export const parseNumber = (value: string): number => {
  return parseInt(value.replace(/,/g, ''), 10);
};

export const calculateTotalInvestment = (stocks: StockType[]): number => {
  return stocks.reduce((total, stock) => {
    return total + (stock.purchasePrice * stock.amount);
  }, 0);
};

export const calculateRemainingAmount = (totalAmount: number, stocks: StockType[]): number => {
  const currentTotal = calculateTotalInvestment(stocks);
  return totalAmount - currentTotal;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

export const generatePortfolioWeights = (stocks: StockType[]) => {
  const totalInvestment = calculateTotalInvestment(stocks);
  return stocks.map(stock => ({
    name: stock.name,
    weight: ((stock.purchasePrice * stock.amount) / totalInvestment) * 100
  }));
};

export const calculatePortfolioSummary = (stocks: StockType[]) => {
  return stocks.reduce((summary, stock) => {
    const currency = stock.currency;
    if (!summary[currency]) {
      summary[currency] = {
        totalAmount: 0,
        totalValue: 0
      };
    }
    summary[currency].totalAmount += stock.amount;
    summary[currency].totalValue += stock.purchasePrice * stock.amount;
    return summary;
  }, {} as Record<string, { totalAmount: number; totalValue: number }>);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};