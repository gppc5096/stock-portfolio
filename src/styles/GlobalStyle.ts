import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text.primary};
    font-family: 'Gowun Batang', serif;
    transition: all 0.3s ease-in-out;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.text.primary};
    font-family: 'Grandiflora One', serif;
  }

  button {
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text.primary};
    border: 1px solid ${props => props.theme.colors.border};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.onPrimary};
    }
  }

  input {
    background-color: ${props => props.theme.colors.surface};
    color: ${props => props.theme.colors.text.primary};
    border: 1px solid ${props => props.theme.colors.border};
    padding: ${props => props.theme.spacing.sm};
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;