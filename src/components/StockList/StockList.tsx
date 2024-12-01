import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { StockType, Currency } from '@/types/portfolio';

interface StockListProps {
  stocks: StockType[];
  onDeleteStock: (id: string) => void;
  onEditStock: (stock: StockType) => void;
}

interface EditingStock {
  id: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currency: Currency;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${props => props.theme.spacing.lg};
`;

const Th = styled.th<{ width?: string; textAlign?: string }>`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text.primary};
  text-align: ${props => props.textAlign || 'left'};
  width: ${props => props.width || 'auto'};
  white-space: nowrap;
`;

const Td = styled.td`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  margin-left: ${props => props.theme.spacing.sm};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &.edit {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.onSecondary};
  }
  
  &.delete {
    background-color: ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.onError};
  }
  
  &.save {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.onPrimary};
  }
  
  &.cancel {
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text.primary};
  }
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  width: 100px;
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  width: 100px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SummaryContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
`;

const SummaryItem = styled.div`
  flex: 1;
`;

const SummaryLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const SummaryValue = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
`;

const getCurrencySymbol = (currency: Currency): string => {
  switch (currency) {
    case '원화':
      return '₩';
    case '달러':
      return '$';
    case '엔화':
      return '¥';
    case '유로화':
      return '€';
    default:
      return '';
  }
};

const StockList: React.FC<StockListProps> = ({ stocks, onDeleteStock, onEditStock }) => {
  const [editingStock, setEditingStock] = useState<EditingStock | null>(null);

  const summary = useMemo(() => {
    return stocks.reduce((acc, stock) => {
      const currency = stock.currency;
      if (!acc[currency]) {
        acc[currency] = {
          totalAmount: 0,
          totalValue: 0
        };
      }
      
      acc[currency].totalAmount += stock.amount;
      
      const stockValue = stock.purchasePrice * stock.amount;
      acc[currency].totalValue += stockValue;
      
      return acc;
    }, {} as Record<Currency, { totalAmount: number; totalValue: number }>);
  }, [stocks]);

  const formatSummary = (value: number, currency: Currency) => {
    return `${getCurrencySymbol(currency)}${value.toLocaleString()}`;
  };

  const handleEdit = (stock: StockType) => {
    setEditingStock({
      id: stock.id,
      name: stock.name,
      amount: stock.amount,
      purchasePrice: stock.purchasePrice,
      currency: stock.currency
    });
  };

  const handleSave = () => {
    if (editingStock) {
      const updatedStock: StockType = {
        ...editingStock
      };
      onEditStock(updatedStock);
      setEditingStock(null);
    }
  };

  const handleCancel = () => {
    setEditingStock(null);
  };

  const handleInputChange = (
    field: keyof EditingStock,
    value: string | Currency,
    isNumeric: boolean = false
  ) => {
    if (editingStock) {
      let newValue: string | number | Currency = value;
      if (isNumeric) {
        newValue = value === '' ? 0 : Number(value.toString().replace(/[^0-9]/g, ''));
      }
      setEditingStock({
        ...editingStock,
        [field]: newValue
      });
    }
  };

  const formatPrice = (price: number, currency: Currency) => {
    return `${getCurrencySymbol(currency)}${price.toLocaleString()}`;
  };

  return (
    <div>
      <h2>보유 종목 목록</h2>
      
      <SummaryContainer>
        {Object.entries(summary).map(([currency, data]) => (
          <SummaryItem key={currency}>
            <SummaryLabel>{currency} 합계</SummaryLabel>
            <SummaryValue>
              {formatSummary(data.totalValue, currency as Currency)}
              {' / '}
              {data.totalAmount.toLocaleString()}주
            </SummaryValue>
          </SummaryItem>
        ))}
      </SummaryContainer>

      <Table>
        <thead>
          <tr>
            <Th width="25%">종목명</Th>
            <Th width="20%">매수가</Th>
            <Th width="15%">수량</Th>
            <Th width="15%">통화</Th>
            <Th width="25%" textAlign="center">작업</Th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id}>
              <Td>
                {editingStock?.id === stock.id ? (
                  <Input
                    value={editingStock.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  stock.name
                )}
              </Td>
              <Td>
                {editingStock?.id === stock.id ? (
                  <Input
                    value={editingStock.purchasePrice}
                    onChange={(e) => handleInputChange('purchasePrice', e.target.value, true)}
                  />
                ) : (
                  formatPrice(stock.purchasePrice, stock.currency)
                )}
              </Td>
              <Td>
                {editingStock?.id === stock.id ? (
                  <Input
                    value={editingStock.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value, true)}
                  />
                ) : (
                  stock.amount.toLocaleString()
                )}
              </Td>
              <Td>
                {editingStock?.id === stock.id ? (
                  <Select
                    value={editingStock.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value as Currency)}
                  >
                    <option value="원화">원화</option>
                    <option value="달러">달러</option>
                    <option value="엔화">엔화</option>
                    <option value="유로화">유로화</option>
                  </Select>
                ) : (
                  stock.currency
                )}
              </Td>
              <Td style={{ textAlign: 'center' }}>
                {editingStock?.id === stock.id ? (
                  <>
                    <Button className="save" onClick={handleSave}>저장</Button>
                    <Button className="cancel" onClick={handleCancel}>취소</Button>
                  </>
                ) : (
                  <>
                    <Button className="edit" onClick={() => handleEdit(stock)}>수정</Button>
                    <Button className="delete" onClick={() => onDeleteStock(stock.id)}>삭제</Button>
                  </>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StockList; 