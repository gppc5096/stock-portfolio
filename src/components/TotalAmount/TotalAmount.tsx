import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TotalAmountType } from '@/types/portfolio';

const TotalAmountWrapper = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AmountInput = styled.input`
  width: 200px;
  margin-right: ${props => props.theme.spacing.sm};
`;

const CurrencySelect = styled.select`
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text.primary};
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

const TotalAmount: React.FC = () => {
  const [totalAmount, setTotalAmount] = useState<TotalAmountType>({
    amount: 0,
    currency: '원'
  });
  const [error, setError] = useState<string>('');

  // LocalStorage에서 데이터 불러오기
  useEffect(() => {
    const savedAmount = localStorage.getItem('totalAmount');
    if (savedAmount) {
      setTotalAmount(JSON.parse(savedAmount));
    }
  }, []);

  // 금액 변경 핸들러
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value.replace(/[^0-9]/g, ''));

    if (isNaN(numValue)) {
      setError('숫자만 입력해주세요.');
      return;
    }

    if (numValue < 0) {
      setError('0보다 큰 금액을 입력해주세요.');
      return;
    }

    setError('');
    setTotalAmount(prev => {
      const newAmount = { ...prev, amount: numValue };
      localStorage.setItem('totalAmount', JSON.stringify(newAmount));
      return newAmount;
    });
  };

  // 통화 변경 핸들러
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTotalAmount(prev => {
      const newAmount = { ...prev, currency: e.target.value as TotalAmountType['currency'] };
      localStorage.setItem('totalAmount', JSON.stringify(newAmount));
      return newAmount;
    });
  };

  return (
    <TotalAmountWrapper>
      <h2>총 투자 금액</h2>
      <div>
        <AmountInput
          type="text"
          value={totalAmount.amount.toLocaleString()}
          onChange={handleAmountChange}
          placeholder="투자 금액을 입력하세요"
        />
        <CurrencySelect
          value={totalAmount.currency}
          onChange={handleCurrencyChange}
        >
          <option value="원">원</option>
          <option value="달러">달러</option>
          <option value="엔">엔</option>
        </CurrencySelect>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TotalAmountWrapper>
  );
};

export default TotalAmount; 