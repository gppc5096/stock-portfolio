import React, { useState } from 'react';
import styled from 'styled-components';
import { StockInputProps, StockType, ValidationResult } from '@/types/portfolio';

const StockInputWrapper = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Input = styled.input`
  flex: 1;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.onPrimary};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const StockInput: React.FC<StockInputProps> = ({ onAddStock, currency }) => {
  const [stockName, setStockName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!stockName.trim()) {
      setError('종목명을 입력해주세요.');
      return;
    }

    const numericPrice = Number(purchasePrice.replace(/[^0-9]/g, ''));
    const numericAmount = Number(amount.replace(/[^0-9]/g, ''));

    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError('유효한 매수금액을 입력해주세요.');
      return;
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('유효한 수량을 입력해주세요.');
      return;
    }

    // 새 종목 추가
    const newStock: StockType = {
      id: Date.now().toString(),
      name: stockName.trim(),
      purchasePrice: numericPrice,
      amount: numericAmount,
      currency: currency
    };

    onAddStock(newStock);
    
    // 입력 필드 초기화
    setStockName('');
    setPurchasePrice('');
    setAmount('');
    setError('');
  };

  const formatNumber = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue ? Number(numericValue).toLocaleString() : '';
  };

  return (
    <StockInputWrapper>
      <h2>종목 추가</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            placeholder="종목명"
          />
          <Input
            type="text"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(formatNumber(e.target.value))}
            placeholder="매수금액"
          />
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(formatNumber(e.target.value))}
            placeholder="수량"
          />
          <Button type="submit">추가</Button>
        </InputGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </StockInputWrapper>
  );
};

export default StockInput; 