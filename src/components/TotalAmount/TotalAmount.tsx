import React, { useState } from 'react';
import styled from 'styled-components';
import { TotalAmountProps, Currency } from '@/types/portfolio';

const TotalAmountWrapper = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const InputGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const Input = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 15px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CurrencySelect = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 15px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
  cursor: pointer;
  min-width: 100px;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin-top: ${props => props.theme.spacing.sm};
  font-size: 0.9rem;
`;

const CurrencySymbol = styled.span`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text.secondary};
  z-index: 1;
  pointer-events: none;
`;

const InputWithCurrency = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  
  ${Input} {
    width: 100%;
    padding-left: ${props => props.theme.spacing.xl};
  }
`;

const TotalAmount: React.FC<TotalAmountProps> = ({ totalAmount, onUpdate }) => {
  const [error, setError] = useState('');

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

  const formatAmount = (value: number, currency: Currency): string => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = Number(value);

    if (isNaN(numValue)) {
      setError('숫자만 입력해주세요.');
      return;
    }

    if (numValue < 0) {
      setError('0보다 큰 금액을 입력해주세요.');
      return;
    }

    setError('');
    const newAmount = {
      ...totalAmount,
      amount: numValue
    };
    onUpdate(newAmount);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAmount = {
      ...totalAmount,
      currency: e.target.value as Currency
    };
    onUpdate(newAmount);
  };

  return (
    <TotalAmountWrapper>
      <h2>총 투자 금액</h2>
      <InputGroup>
        <InputWithCurrency>
          <CurrencySymbol>{getCurrencySymbol(totalAmount.currency)}</CurrencySymbol>
          <Input
            type="text"
            value={formatAmount(totalAmount.amount, totalAmount.currency)}
            onChange={handleAmountChange}
            placeholder="투자 금액을 입력하세요"
          />
        </InputWithCurrency>
        <CurrencySelect
          value={totalAmount.currency}
          onChange={handleCurrencyChange}
        >
          <option value="원화">원화</option>
          <option value="달러">달러</option>
          <option value="엔화">엔화</option>
          <option value="유로화">유로화</option>
        </CurrencySelect>
      </InputGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TotalAmountWrapper>
  );
};

export default TotalAmount; 