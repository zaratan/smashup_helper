/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';

import '../styles/main.css';
import { FactionsProvider } from '../contexts/FactionsContext';
import { OptionsProvider } from '../contexts/OptionsContext';
import { ThemeProvider } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <OptionsProvider>
        <FactionsProvider>
          <Component {...pageProps} />
        </FactionsProvider>
      </OptionsProvider>
    </ThemeProvider>
  );
}

export default MyApp;
