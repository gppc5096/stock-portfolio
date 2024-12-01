import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { StockType, Currency } from '@/types/portfolio';

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

interface StockInputProps {
  onAddStock: (stock: StockType) => void;
  currency: Currency;
}

const StockInput: React.FC<StockInputProps> = ({ onAddStock, currency: defaultCurrency }) => {
  const [formData, setFormData] = useState({
    name: '',
    purchasePrice: '',
    amount: '',
    currency: defaultCurrency
  });

  const removeCommas = (value: string): string => {
    return value.replace(/,/g, '');
  };

  const addCommas = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'purchasePrice' || field === 'amount') {
      const numericValue = removeCommas(value);
      const formattedValue = addCommas(numericValue);
      
      setFormData(prev => ({
        ...prev,
        [field]: formattedValue
      }));
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

    const newStock: StockType = {
      id: uuidv4(),
      name: formData.name,
      purchasePrice: Number(removeCommas(formData.purchasePrice)),
      amount: Number(removeCommas(formData.amount)),
      currency: formData.currency
    };

    onAddStock(newStock);
    setFormData({
      name: '',
      purchasePrice: '',
      amount: '',
      currency: defaultCurrency
    });
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
      <Button type="submit">추가</Button>
    </form>
  );
};

export default StockInput; 