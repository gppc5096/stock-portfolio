import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: Theme & DefaultTheme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    
    ${props => props.theme.breakpoints.mobile} {
      font-size: 14px;
    }
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text.primary};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.5;
  }

  input, select, button {
    font-size: inherit;
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    
    ${props => props.theme.breakpoints.mobile} {
      display: block;
      overflow-x: auto;
    }
  }
`;