import { StockType, Currency } from '@/types/portfolio';

// 포트폴리오 총 가치 계산
export const calculateTotalValue = (stocks: StockType[]): number => {
  return stocks.reduce((total, stock) => {
    return total + (stock.amount * stock.purchasePrice);
  }, 0);
};

// 각 종목의 비중 계산
export const calculateStockWeight = (
  stock: StockType,
  totalValue: number
): number => {
  const stockValue = stock.amount * stock.purchasePrice;
  return totalValue > 0 ? (stockValue / totalValue) * 100 : 0;
};

// 포트폴리오 비중 데이터 생성
export const generatePortfolioWeights = (stocks: StockType[]) => {
  const totalValue = calculateTotalValue(stocks);
  
  return stocks.map(stock => ({
    id: stock.id,
    name: stock.name,
    value: stock.amount * stock.purchasePrice,
    weight: calculateStockWeight(stock, totalValue),
    currency: stock.currency
  }));
};

// 통화별 금액 변환 (환율은 실제 API에서 가져와야 함)
export const convertCurrency = (
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  const exchangeRates: Record<Currency, number> = {
    '원': 1,
    '달러': 1300, // 예시 환율
    '엔': 9.5    // 예시 환율
  };

  const amountInWon = fromCurrency === '원' 
    ? amount 
    : amount * exchangeRates[fromCurrency];
  
  return toCurrency === '원' 
    ? amountInWon 
    : amountInWon / exchangeRates[toCurrency];
};

// 숫자 포맷팅 (천단위 구분)
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('ko-KR').format(value);
};

// 비중 포맷팅 (소수점 2자리)
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

// 포트폴리오 요약 정보 계산
export const calculatePortfolioSummary = (stocks: StockType[]) => {
  const totalValue = calculateTotalValue(stocks);
  const stockCount = stocks.length;
  const weights = generatePortfolioWeights(stocks);
  
  const highestWeight = weights.reduce((max, current) => 
    current.weight > max.weight ? current : max
  , weights[0]);

  const lowestWeight = weights.reduce((min, current) => 
    current.weight < min.weight ? current : min
  , weights[0]);

  return {
    totalValue,
    stockCount,
    highestWeight: highestWeight?.name ? {
      name: highestWeight.name,
      weight: highestWeight.weight
    } : null,
    lowestWeight: lowestWeight?.name ? {
      name: lowestWeight.name,
      weight: lowestWeight.weight
    } : null
  };
};

// 실시간 업데이트를 위한 디바운스 함수
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}; 