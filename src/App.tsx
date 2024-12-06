import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { darkTheme } from './styles/theme';
import TotalAmount from './components/TotalAmount';
import StockInput from './components/StockInput';
import StockList from './components/StockList';
import PieChart from './components/PieChart';
import PortfolioManager from './components/PortfolioManager';
import Footer from './components/Footer';
import { usePortfolio, INITIAL_STATE } from './hooks/usePortfolio';
import { StockType, Currency, PortfolioState } from '@/types/portfolio';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text.primary};
  font-size: 2rem;
  font-weight: bold;
  
  ${props => props.theme.breakpoints.mobile} {
    font-size: 1.5rem;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  ${props => props.theme.breakpoints.mobile} {
    grid-template-columns: 1fr;
  }
`;

const DashboardCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h2 {
    color: ${props => props.theme.colors.text.primary};
    font-size: 1.25rem;
    margin-bottom: ${props => props.theme.spacing.md};
    padding-bottom: ${props => props.theme.spacing.sm};
    border-bottom: 2px solid ${props => props.theme.colors.primary};
  }
`;

const Section = styled.section`
  background: ${props => props.theme.colors.surface};
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StockListSection = styled(Section)`
  h2 {
    color: ${props => props.theme.colors.text.primary};
    font-size: 1.25rem;
    margin-bottom: ${props => props.theme.spacing.md};
    padding-bottom: ${props => props.theme.spacing.sm};
    border-bottom: 2px solid ${props => props.theme.colors.primary};
  }
`;

const ManagerSection = styled(Section)`
  h2 {
    color: ${props => props.theme.colors.text.primary};
    font-size: 1.25rem;
    margin-bottom: ${props => props.theme.spacing.md};
    padding-bottom: ${props => props.theme.spacing.sm};
    border-bottom: 2px solid ${props => props.theme.colors.secondary};
  }
`;

function App() {
  const {
    portfolio,
    updateTotalAmount,
    addStock,
    deleteStock,
    updateStock,
    importPortfolio,
    resetPortfolio
  } = usePortfolio();

  const [currentCurrency, setCurrentCurrency] = useState<Currency>(portfolio.totalAmount.currency);
  const [currentPortfolio, setCurrentPortfolio] = useState<PortfolioState>(portfolio);

  useEffect(() => {
    setCurrentPortfolio(portfolio);
  }, [portfolio]);

  const handleCurrencyChange = (currency: Currency) => {
    setCurrentCurrency(currency);
  };

  const handleTotalAmountUpdate = (totalAmount: { amount: number; currency: Currency }) => {
    updateTotalAmount(totalAmount);
    handleCurrencyChange(totalAmount.currency);
  };

  const handleReset = () => {
    resetPortfolio();
    setCurrentCurrency('원화');
    handleTotalAmountUpdate(INITIAL_STATE.totalAmount);
    setCurrentPortfolio(INITIAL_STATE);
    localStorage.clear();
    localStorage.setItem('portfolio', JSON.stringify(INITIAL_STATE));
    window.location.reload();
  };

  const handleImport = (stocks: StockType[]) => {
    const newPortfolio: PortfolioState = {
      ...portfolio,
      stocks: stocks
    };
    importPortfolio(newPortfolio);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle theme={darkTheme} />
      <Container>
        <Title>주식 포트폴리오 관리</Title>
        
        <TopGrid>
          <DashboardCard>
            <TotalAmount 
              totalAmount={currentPortfolio.totalAmount} 
              onUpdate={handleTotalAmountUpdate}
              onCurrencyChange={handleCurrencyChange}
            />
          </DashboardCard>
          
          <DashboardCard>
            <StockInput 
              onAddStock={addStock} 
              currency={currentCurrency}
              totalAmount={currentPortfolio.totalAmount.amount}
              stocks={currentPortfolio.stocks}
            />
          </DashboardCard>
        </TopGrid>

        <Section>
          <PieChart stocks={currentPortfolio.stocks} />
        </Section>

        <StockListSection>
          <StockList 
            stocks={currentPortfolio.stocks} 
            onDeleteStock={deleteStock}
            onEditStock={updateStock}
          />
        </StockListSection>

        <ManagerSection>
          <PortfolioManager 
            stocks={currentPortfolio.stocks}
            onImport={handleImport}
            onReset={handleReset}
          />
        </ManagerSection>

        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
