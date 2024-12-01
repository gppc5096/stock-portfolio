import React from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { StockType } from '@/types/portfolio';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartWrapper = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ChartContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.text.secondary};
  padding: ${props => props.theme.spacing.lg};
`;

interface PieChartProps {
  stocks: StockType[];
}

const PieChart: React.FC<PieChartProps> = ({ stocks }) => {
  // 차트 데이터 생성
  const generateChartData = (): ChartData<'pie'> => {
    const totalInvestments = stocks.reduce(
      (sum, stock) => sum + stock.purchasePrice * stock.amount,
      0
    );

    const data = stocks.map(stock => ({
      name: stock.name,
      value: (stock.purchasePrice * stock.amount / totalInvestments) * 100
    }));

    return {
      labels: data.map(item => `${item.name} (${item.value.toFixed(1)}%)`),
      datasets: [
        {
          data: data.map(item => item.value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(199, 199, 199, 0.8)',
            'rgba(83, 102, 255, 0.8)',
            'rgba(40, 159, 64, 0.8)',
            'rgba(210, 199, 199, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
            'rgba(40, 159, 64, 1)',
            'rgba(210, 199, 199, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // 차트 옵션 설정
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#FFFFFF',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw as number;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      }
    }
  };

  if (stocks.length === 0) {
    return (
      <ChartWrapper>
        <h2>포트폴리오 비중</h2>
        <NoDataMessage>표시할 데이터가 없습니다.</NoDataMessage>
      </ChartWrapper>
    );
  }

  return (
    <ChartWrapper>
      <h2>포트폴리오 비중</h2>
      <ChartContainer>
        <Pie data={generateChartData()} options={options} />
      </ChartContainer>
    </ChartWrapper>
  );
};

export default PieChart; 