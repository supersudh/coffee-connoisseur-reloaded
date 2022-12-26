import type { AppProps } from 'next/app'

import StoreProvider from '../store/store.context';

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <div>
        <Component {...pageProps} />{" "}
        <footer>
          <p>© {new Date().getFullYear()} supersudh</p>
        </footer>
      </div>
    </StoreProvider>
  );
}
