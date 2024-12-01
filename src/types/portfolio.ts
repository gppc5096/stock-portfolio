export type Currency = '원' | '달러' | '엔';

export interface TotalAmountType {
  amount: number;
  currency: Currency;
}

export interface StockType {
  id: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currency: Currency;
}

export interface PortfolioState {
  totalAmount: TotalAmountType;
  stocks: StockType[];
}

export interface ChartDataItem {
  name: string;
  value: number;
  percentage: number;
}

export interface TotalAmountProps {
  totalAmount: TotalAmountType;
  onUpdate: (amount: TotalAmountType) => void;
}

export interface StockInputProps {
  onAddStock: (stock: StockType) => void;
  currency: Currency;
}

export interface StockListProps {
  stocks: StockType[];
  onDeleteStock: (id: string) => void;
  onEditStock: (stock: StockType) => void;
}

export interface PieChartProps {
  stocks: StockType[];
  currency: Currency;
}

export interface PortfolioManagerProps {
  portfolio: PortfolioState;
  onImport: (portfolio: PortfolioState) => void;
  onExport: () => void;
}

export type SortKey = 'name' | 'purchasePrice' | 'amount';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

export interface ErrorState {
  message: string;
  field?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: ErrorState;
} 