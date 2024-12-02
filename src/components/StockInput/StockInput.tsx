import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { StockType, Currency } from '@/types/portfolio';
import { calculateTotalInvestment, calculateRemainingAmount, formatNumber, parseNumber } from '../../utils/calculations';

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 15px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 15px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.md};
  cursor: pointer;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md};
  border: none;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.onPrimary};
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
  
  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError ? props.theme.colors.error : props.theme.colors.text.secondary};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.sm};
`;

interface StockInputProps {
  onAddStock: (stock: StockType) => void;
  currency: Currency;
  totalAmount: number;
  stocks: StockType[];
}

const StockInput: React.FC<StockInputProps> = ({ onAddStock, currency: defaultCurrency, totalAmount, stocks }) => {
  const [formData, setFormData] = useState({
    name: '',
    purchasePrice: '',
    amount: '',
    currency: defaultCurrency
  });
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const checkAmount = (price: string, amount: string) => {
    if (!price || !amount) return;

    const numericPrice = parseNumber(price);
    const numericAmount = parseNumber(amount);
    const newInvestment = numericPrice * numericAmount;
    const currentTotal = calculateTotalInvestment(stocks);
    const remainingBefore = totalAmount - currentTotal;
    
    if (newInvestment > remainingBefore) {
      const excess = newInvestment - remainingBefore;
      setMessage({
        text: `총 투자금액보다 ${formatNumber(excess)}원이 많아 입력이 불가능합니다.`,
        isError: true
      });
    } else {
      const remaining = remainingBefore - newInvestment;
      setMessage({
        text: `총 투자금액 중 ${formatNumber(remaining)}원 추가로 입력 가능합니다.`,
        isError: false
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'purchasePrice' || field === 'amount') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const formattedValue = numericValue ? formatNumber(parseInt(numericValue)) : '';
      
      setFormData(prev => ({
        ...prev,
        [field]: formattedValue
      }));

      // 실시간으로 투자 가능 금액 계산
      if (field === 'purchasePrice' && formData.amount) {
        checkAmount(formattedValue, formData.amount);
      } else if (field === 'amount' && formData.purchasePrice) {
        checkAmount(formData.purchasePrice, formattedValue);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.purchasePrice || !formData.amount) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const price = parseNumber(formData.purchasePrice);
    const amount = parseNumber(formData.amount);
    const newInvestment = price * amount;
    const remainingAmount = calculateRemainingAmount(totalAmount, stocks);

    if (newInvestment > remainingAmount) {
      alert(`투자 가능 금액(${formatNumber(remainingAmount)}원)을 초과할 수 없습니다.`);
      return;
    }

    const newStock: StockType = {
      id: uuidv4(),
      name: formData.name,
      purchasePrice: price,
      amount: amount,
      currency: formData.currency
    };

    onAddStock(newStock);
    setFormData({
      name: '',
      purchasePrice: '',
      amount: '',
      currency: defaultCurrency
    });
    setMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>종목 추가</h2>
      <Input
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="종목명"
      />
      <Input
        type="text"
        value={formData.purchasePrice}
        onChange={(e) => handleChange('purchasePrice', e.target.value)}
        placeholder="매수가"
      />
      <Input
        type="text"
        value={formData.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        placeholder="수량"
      />
      <Select 
        value={formData.currency}
        onChange={(e) => handleChange('currency', e.target.value as Currency)}
      >
        <option value="원화">원화</option>
        <option value="달러">달러</option>
        <option value="엔화">엔화</option>
        <option value="유로화">유로화</option>
      </Select>
      {message && (
        <Message isError={message.isError}>
          {message.text}
        </Message>
      )}
      <Button type="submit">추가</Button>
    </form>
  );
};

export default StockInput; 