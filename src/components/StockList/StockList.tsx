import React, { useState } from 'react';
import styled from 'styled-components';
import { StockType } from '@/types/portfolio';

const StockListWrapper = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${props => props.theme.spacing.md};
`;

const Th = styled.th`
  text-align: left;
  padding: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Td = styled.td`
  padding: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const DeleteButton = styled.button`
  background-color: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.onError};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
  padding: ${props => props.theme.spacing.lg};
`;

interface StockListProps {
  stocks: StockType[];
  onDeleteStock: (id: string) => void;
}

type SortKey = 'name' | 'purchasePrice' | 'amount';
type SortDirection = 'asc' | 'desc';

const StockList: React.FC<StockListProps> = ({ stocks, onDeleteStock }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'name',
    direction: 'asc'
  });

  const handleSort = (key: SortKey) => {
    setSortConfig(prevConfig => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortConfig.key === 'name') {
      return sortConfig.direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  const calculateTotal = (price: number, amount: number) => {
    return formatNumber(price * amount);
  };

  if (stocks.length === 0) {
    return (
      <StockListWrapper>
        <h2>보유 종목 목록</h2>
        <EmptyMessage>추가된 종목이 없습니다.</EmptyMessage>
      </StockListWrapper>
    );
  }

  return (
    <StockListWrapper>
      <h2>보유 종목 목록</h2>
      <Table>
        <thead>
          <tr>
            <Th onClick={() => handleSort('name')}>
              종목명 {getSortIcon('name')}
            </Th>
            <Th onClick={() => handleSort('purchasePrice')}>
              매수단가 {getSortIcon('purchasePrice')}
            </Th>
            <Th onClick={() => handleSort('amount')}>
              수량 {getSortIcon('amount')}
            </Th>
            <Th>총 매수금액</Th>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map(stock => (
            <tr key={stock.id}>
              <Td>{stock.name}</Td>
              <Td>{formatNumber(stock.purchasePrice)} {stock.currency}</Td>
              <Td>{formatNumber(stock.amount)}</Td>
              <Td>
                {calculateTotal(stock.purchasePrice, stock.amount)} {stock.currency}
              </Td>
              <Td>
                <DeleteButton onClick={() => onDeleteStock(stock.id)}>
                  삭제
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </StockListWrapper>
  );
};

export default StockList; 