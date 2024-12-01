import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { StockType } from '@/types/portfolio';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  stocks: StockType[];
}

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartWrapper = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.lg};
  border-radius: 8px;
  
  h3 {
    text-align: center;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text.primary};
  }
`;

const PieChart: React.FC<PieChartProps> = ({ stocks }) => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const createChartData = (values: number[], labels: string[]) => ({
    labels,
    datasets: [{
      data: values,
      backgroundColor: labels.map(() => getRandomColor()),
      borderWidth: 1
    }]
  });

  const valueData = stocks.map(stock => stock.purchasePrice * stock.amount);
  const amountData = stocks.map(stock => stock.amount);
  const labels = stocks.map(stock => `${stock.name} (${stock.currency})`);

  const options = {
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  return (
    <ChartContainer>
      <ChartWrapper>
        <h3>매수금액 비중</h3>
        <Pie data={createChartData(valueData, labels)} options={options} />
      </ChartWrapper>
      <ChartWrapper>
        <h3>보유수량 비중</h3>
        <Pie data={createChartData(amountData, labels)} options={options} />
      </ChartWrapper>
    </ChartContainer>
  );
};

export default PieChart; 