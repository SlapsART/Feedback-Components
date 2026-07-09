import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { cosmosTheme } from '@theme/cosmosTheme';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={cosmosTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { height: '100%' },
          body: { height: '100%' },
          '#root': { height: '100%' },
        }}
      />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
