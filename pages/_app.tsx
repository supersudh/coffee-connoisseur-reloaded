import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />{" "}
      <footer>
        <p>© {new Date().getFullYear()} supersudh</p>
    </footer>
    </div>
  );
}
