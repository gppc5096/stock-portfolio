import React, { useRef } from 'react';
import styled from 'styled-components';
import { StockType } from '@/types/portfolio';

const ManagerWrapper = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
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
`;

const HiddenInput = styled.input`
  display: none;
`;

const Message = styled.p<{ isError?: boolean }>`
  color: ${props => props.isError 
    ? props.theme.colors.error 
    : props.theme.colors.text.secondary};
  margin-top: ${props => props.theme.spacing.sm};
  font-size: 0.875rem;
`;

interface PortfolioManagerProps {
  stocks: StockType[];
  onImport: (stocks: StockType[]) => void;
}

const PortfolioManager: React.FC<PortfolioManagerProps> = ({ stocks, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState<{ text: string; isError: boolean } | null>(null);

  const handleExport = () => {
    try {
      const portfolioData = JSON.stringify(stocks, null, 2);
      const blob = new Blob([portfolioData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setMessage({ text: '포트폴리오가 성공적으로 내보내기되었습니다.', isError: false });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ text: '내보내기 중 오류가 발생했습니다.', isError: true });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData = JSON.parse(content);
        
        // 데이터 유효성 검사
        if (!Array.isArray(importedData)) {
          throw new Error('유효하지 않은 포트폴리오 데이터입니다.');
        }

        const isValidStock = (stock: any): stock is StockType => {
          return (
            typeof stock.id === 'string' &&
            typeof stock.name === 'string' &&
            typeof stock.amount === 'number' &&
            typeof stock.purchasePrice === 'number' &&
            ['원', '달러', '엔'].includes(stock.currency)
          );
        };

        if (!importedData.every(isValidStock)) {
          throw new Error('유효하지 않은 종목 데이터가 포함되어 있습니다.');
        }

        onImport(importedData);
        setMessage({ text: '포트폴리오가 성공적으로 가져오기되었습니다.', isError: false });
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        setMessage({ 
          text: error instanceof Error ? error.message : '파일 읽기 중 오류가 발생했습니다.', 
          isError: true 
        });
      }
    };

    reader.onerror = () => {
      setMessage({ text: '파일 읽기 중 오류가 발생했습니다.', isError: true });
    };

    reader.readAsText(file);
    event.target.value = ''; // 파일 입력 초기화
  };

  return (
    <ManagerWrapper>
      <h2>포트폴리오 관리</h2>
      <ButtonGroup>
        <Button onClick={handleExport}>
          포트폴리오 내보내기
        </Button>
        <Button onClick={handleImportClick}>
          포트폴리오 가져오기
        </Button>
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
        />
      </ButtonGroup>
      {message && (
        <Message isError={message.isError}>
          {message.text}
        </Message>
      )}
    </ManagerWrapper>
  );
};

export default PortfolioManager; 