import React, { useState } from 'react';
import styled from 'styled-components';
import { TotalAmountProps, Currency } from '@/types/portfolio';
import { formatNumber, parseNumber } from '../../utils/calculations';

const Wrapper = styled.div`
  position: relative;
`;

const InputGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  padding-right: 40px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 15px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text.primary};
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
  cursor: pointer;
  min-width: 100px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ConfirmButton = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.onPrimary};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const MessageBox = styled.div<{ show: boolean }>`
  position: relative;
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? '0' : '-10px'});
  transition: all 0.3s ease;
  background: linear-gradient(
    135deg, 
    ${props => props.theme.colors.surface} 0%,
    ${props => `${props.theme.colors.surface}dd`} 100%
  );
  border: 1px solid ${props => `${props.theme.colors.primary}33`};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.md};
  box-shadow: 0 4px 6px ${props => `${props.theme.colors.primary}11`};
  z-index: 1;
`;

const MessageText = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.1rem; // 폰트 크기 증가
  line-height: 2;    // 줄 간격 증가
  text-align: center;
  font-weight: 500;
`;

const CurrencySymbol = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text.secondary};
  pointer-events: none;
`;

const QuoteContainer = styled.div`
  position: relative;
  margin-top: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  background: linear-gradient(
    to right,
    ${props => `${props.theme.colors.surface}99`} 0%,
    ${props => `${props.theme.colors.surface}55`} 100%
  );
  border-radius: 12px;
  border-left: 4px solid ${props => props.theme.colors.primary};
  box-shadow: 0 4px 6px ${props => `${props.theme.colors.primary}11`};
  transition: all 0.3s ease;
  z-index: 0;
  display: block;
  visibility: visible;
  
  &:hover {
    transform: translateX(5px);
    border-left-width: 6px;
  }
`;

const KoreanQuote = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  font-weight: 500;
  line-height: 1.6;
`;

const EnglishQuote = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
  font-style: italic;
  line-height: 1.5;
`;

const Author = styled.span`
  display: block;
  text-align: right;
  margin-top: ${props => props.theme.spacing.md};
  color: #FFFFFF;
  font-weight: 600;
  font-size: 0.9rem;
`;

const TotalAmount: React.FC<TotalAmountProps> = ({ 
  totalAmount, 
  onUpdate,
  onCurrencyChange 
}) => {
  const [amount, setAmount] = useState(totalAmount.amount.toString());
  const [currency, setCurrency] = useState<Currency>(totalAmount.currency);
  const [showMessage, setShowMessage] = useState(false);

  const getCurrencySymbol = (curr: Currency): string => {
    switch (curr) {
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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = value ? formatNumber(parseInt(value)) : '';
    setAmount(formattedValue);
    setShowMessage(false);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as Currency;
    setCurrency(newCurrency);
    onCurrencyChange(newCurrency);
    setShowMessage(false);
  };

  const handleConfirm = () => {
    const numericAmount = parseNumber(amount);
    onUpdate({
      amount: numericAmount,
      currency
    });
    setShowMessage(true);
  };

  return (
    <Wrapper>
      <h2>총 투자금액</h2>
      <InputGroup>
        <InputWrapper>
          <Input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="금액을 입력하세요"
          />
          <CurrencySymbol>{getCurrencySymbol(currency)}</CurrencySymbol>
        </InputWrapper>
        <Select value={currency} onChange={handleCurrencyChange}>
          <option value="원화">원화</option>
          <option value="달러">달러</option>
          <option value="엔화">엔화</option>
          <option value="유로화">유로화</option>
        </Select>
        <ConfirmButton onClick={handleConfirm}>
          확인
        </ConfirmButton>
      </InputGroup>
      
      <MessageBox show={showMessage}>
        <MessageText>
          설정된 총 투자금액은 {getCurrencySymbol(currency)}{formatNumber(parseNumber(amount))}{currency === '원화' ? '원' : currency}입니다.
          <br />
          설정된 투자금액에 맞추어 포트폴리오를 작성하십시오.
        </MessageText>
      </MessageBox>

      <QuoteContainer>
        <KoreanQuote>
          "10년동안 주식을 소유할 생각이 없다면 10분도 갖고 있지 마세요."
        </KoreanQuote>
        <EnglishQuote>
          "If you don't intend to own a stock for 10 years, don't own it even for 10 minutes."
        </EnglishQuote>
        <Author>- Warren Buffett -</Author>
      </QuoteContainer>
    </Wrapper>
  );
};

export default TotalAmount; 