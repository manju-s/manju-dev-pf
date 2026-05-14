import LandingPage from './components/LandingPage';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <LandingPage />
    </MantineProvider>
  )
}

export default App
