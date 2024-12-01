# 주식 포트폴리오 관리 프로그램 개발 계획

## 1. 개발 환경 설정
### 필수 프로그램
- Node.js: v18.17.0 LTS
- npm: v9.6.7
- Git: v2.39.0 이상

### 프레임워크 및 라이브러리 버전
- React: v18.2.0
- React DOM: v18.2.0
- Chart.js: v4.4.1
- react-chartjs-2: v5.2.0
- styled-components: v6.1.1
- TypeScript: v5.0.2 (타입 안정성 확보)

### 개발 도구
- VSCode 추천 확장프로그램:
  - ESLint: v8.55.0
  - Prettier: v3.1.0
  - GitLens
  - ES7+ React/Redux/React-Native snippets

## 2. 프로젝트 초기 설정
### 프로젝트 생성 및 경로 설정

###프로젝트 절대 경로 설정 (예시)
PROJECT_ROOT="/Users/username/Projects/stock-portfolio"
mkdir -p $PROJECT_ROOT
cd $PROJECT_ROOT

### 프로젝트 생성
npx create-react-app stock-portfolio --template typescript
필요한 라이브러리 설치
npm install chart.js@4.4.1 react-chartjs-2@5.2.0 styled-components@6.1.1
npm install @types/styled-components @types/node @types/react @types/react-dom
개발 의존성 설치
npm install --save-dev eslint@8.55.0 prettier@3.1.0

### tsconfig.json 경로 설정 업데이트
json
{
"compilerOptions": {
// ... 기존 설정 유지 ...
"baseUrl": ".",
"paths": {
"@/": ["src/"],
"@components/": ["src/components/"],
"@hooks/": ["src/hooks/"],
"@utils/": ["src/utils/"],
"@types/": ["src/types/"],
"@styles/": ["src/styles/"]
}
},
"include": ["src"]
}


## 3. 프로젝트 구조 (절대 경로 기준)
$PROJECT_ROOT/
├── src/
│ ├── components/
│ │ ├── StockInput/
│ │ ├── PieChart/
│ │ ├── TotalAmount/
│ │ ├── StockList/
│ │ └── PortfolioManager/
│ ├── hooks/
│ │ ├── useStockCalculator.ts
│ │ └── usePortfolioStorage.ts
│ ├── utils/
│ │ ├── calculations.ts
│ │ └── storage.ts
│ ├── types/
│ │ └── index.ts
│ └── App.tsx
├── package.json
└── tsconfig.json
...


## 4. 프로젝트 구조
stock-portfolio/
├── src/
│ ├── components/
│ │ ├── StockInput/
│ │ ├── PieChart/
│ │ ├── TotalAmount/
│ │ ├── StockList/
│ │ └── PortfolioManager/
│ ├── hooks/
│ │ ├── useStockCalculator.ts
│ │ └── usePortfolioStorage.ts
│ ├── utils/
│ │ ├── calculations.ts
│ │ └── storage.ts
│ ├── types/
│ │ └── index.ts
│ └── App.tsx
├── package.json
└── tsconfig.json

## 5. 기술 스택
- React.js (TypeScript 기반)
- Chart.js (원형 그래프 구현)
- Styled-components (스타일링)
- LocalStorage (데이터 저장)

## 6. 설정 파일

### tsconfig.json 기본 설정
json
{
"compilerOptions": {
"target": "es5",
"lib": ["dom", "dom.iterable", "esnext"],
"allowJs": true,
"skipLibCheck": true,
"esModuleInterop": true,
"allowSyntheticDefaultImports": true,
"strict": true,
"forceConsistentCasingInFileNames": true,
"noFallthroughCasesInSwitch": true,
"module": "esnext",
"moduleResolution": "node",
"resolveJsonModule": true,
"isolatedModules": true,
"noEmit": true,
"jsx": "react-jsx",
"baseUrl": "src"
},
"include": ["src"]
}

### .eslintrc 기본 설정
{
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn"
  }
}

### index.html 폰트 설정
html
<head>
<!-- Google Fonts 설정 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Batang&family=Grandiflora+One&display=swap" rel="stylesheet">
</head>

### GlobalStyle 설정 (styled-components)
ypescript:src/styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle body { font-family: 'Gowun Batang', serif; } h1, h2, h3, h4, h5, h6 { font-family: 'Grandiflora One', serif; };

## 7. 주요 기능 구현
1. 총 투자금액 설정
   - 사용자가 총 투자금액 입력
   - LocalStorage에 저장하여 데이터 유지

2. 주식 종목 관리
   - 종목명, 매수금액 입력 기능
   - 종목 목록 표시
   - 종목 삭제 기능

3. 포트폴리오 비중 계산
   - 실시간 비중 계산
   - 원형 그래프 자동 업데이트

4. 데이터 시각화
   - Chart.js를 활용한 원형 그래프 구현
   - 종목별 비중 표시
   - hover 시 상세 정보 표시

5. 포트폴리오 관리 기능
   - 현재 포트폴리오 저장 기능
   - 저장된 포트폴리오 목록 표시
   - 포트폴리오 불러오기 기능
   - JSON 형식 내보내기/가져오기
   - 포트폴리오 템플릿 제공

## 8. 성능 최적화 고려사항
- React.memo를 통한 불필요한 리렌더링 방지
- 대용량 데이터 처리를 위한 가상화 적용 검토
- 차트 컴포넌트 최적화

## 9. 브라우저 지원
- Chrome (최신 3개 버전)
- Safari 14 이상
- Firefox (최신 3개 버전)