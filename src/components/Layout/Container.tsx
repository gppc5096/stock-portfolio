import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};

  ${props => props.theme.breakpoints.mobile} {
    padding: ${props => props.theme.spacing.sm};
  }

  ${props => props.theme.breakpoints.tablet} {
    padding: ${props => props.theme.spacing.md};
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
  
  ${props => props.theme.breakpoints.mobile} {
    grid-template-columns: 1fr;
  }

  ${props => props.theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${props => props.theme.breakpoints.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Card = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.md};
  
  ${props => props.theme.breakpoints.mobile} {
    padding: ${props => props.theme.spacing.sm};
  }
`; 