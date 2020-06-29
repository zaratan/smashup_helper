/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';

import '../styles/main.css';
import { FactionsProvider } from '../contexts/FactionsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FactionsProvider>
      <Component {...pageProps} />
    </FactionsProvider>
  );
}

export default MyApp;
