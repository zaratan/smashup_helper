/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';

import '../styles/main.css';
import { FactionsProvider } from '../contexts/FactionsContext';
import { OptionsProvider } from '../contexts/OptionsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OptionsProvider>
      <FactionsProvider>
        <Component {...pageProps} />
      </FactionsProvider>
    </OptionsProvider>
  );
}

export default MyApp;
