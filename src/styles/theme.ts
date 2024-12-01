export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};

export const darkTheme = {
  colors: {
    primary: '#6200ee',
    primaryDark: '#3700b3',
    secondary: '#03dac6',
    background: '#121212',
    surface: '#1e1e1e',
    error: '#cf6679',
    disabled: '#666666',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    onError: '#000000',
    border: '#333333',
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  breakpoints: {
    mobile: `@media (max-width: ${breakpoints.mobile})`,
    tablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
    desktop: `@media (min-width: ${breakpoints.tablet})`
  }
};

export type Theme = typeof darkTheme;
