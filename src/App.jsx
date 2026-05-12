import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/dev" element={<PortfolioLandingPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
