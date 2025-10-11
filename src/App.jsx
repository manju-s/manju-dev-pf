import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InProgress from './components/InProgress';
import New from './components/New';
import PortfolioLandingPage from './components/PortfolioLandingPage';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<New />} />
          <Route path="/dev" element={<PortfolioLandingPage />} />
          <Route path="/new" element={<InProgress />} /> 
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
