export interface TotalAmountType {
  amount: number;
  currency: '원' | '달러' | '엔';
}

export interface StockType {
  id: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currency: '원' | '달러' | '엔';
} 