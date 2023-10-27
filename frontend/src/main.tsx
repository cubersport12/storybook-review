import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './styles.css';

import App from './app/app';
import { ThemeProvider } from '@mui/material';
import { defaultTheme } from '@shared/themes';
import { AppLogin, ProtectedElement } from '@shared/components';
import { OpenAPI } from '@shared/api';
import { environment } from './environments/environment';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

OpenAPI.BASE = environment.api;

const getBaseHref = () => {
  const element = document.getElementsByTagName('base').item(0);
  const baseHref = element?.href;
  if (!baseHref) {
    return '';
  }

  const url = new URL(baseHref);
  let pathName = url.pathname;

  if (pathName.endsWith('/')) {
    pathName = pathName.substring(0, pathName.length - 1);
  }

  return pathName;
};

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={getBaseHref()}>
        <ThemeProvider theme={defaultTheme}>
          <Routes>
            <Route
              path={'/*'}
              element={
                <ProtectedElement>
                  <App />
                </ProtectedElement>
              }
            />
            <Route path="login" element={<AppLogin />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
