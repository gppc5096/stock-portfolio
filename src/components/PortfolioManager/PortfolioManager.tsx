import React from 'react';
import styled from 'styled-components';
import { StockType } from '@/types/portfolio';

interface PortfolioManagerProps {
  stocks: StockType[];
  onImport: (stocks: StockType[]) => void;
  onReset: () => void;
}

const Button = styled.button`
  padding: ${props => props.theme.spacing.md};
  margin-right: ${props => props.theme.spacing.md};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &.import {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.onPrimary};
  }

  &.export {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.onSecondary};
  }

  &.reset {
    background-color: ${props => props.theme.colors.error};
    color: ${props => props.theme.colors.onError};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
`;

const PortfolioManager: React.FC<PortfolioManagerProps> = ({ stocks, onImport, onReset }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedStocks = JSON.parse(content);
          onImport(importedStocks);
        } catch (error) {
          alert('파일 형식이 올바르지 않습니다.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(stocks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm('포트폴리오를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      onReset();
    }
  };

  return (
    <div>
      <h2>포트폴리오 관리</h2>
      <ButtonGroup>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <Button className="import" onClick={() => document.getElementById('fileInput')?.click()}>
          포트폴리오 가져오기
        </Button>
        <Button className="export" onClick={handleExport}>
          포트폴리오 내보내기
        </Button>
        <Button className="reset" onClick={handleReset}>
          초기화
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PortfolioManager; 