import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { darkTheme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <div className="App">
        <h1>주식 포트폴리오 관리</h1>
        {/* 여기에 다른 컴포넌트들이 추가될 예정 */}
      </div>
    </ThemeProvider>
  );
}

export default App;
