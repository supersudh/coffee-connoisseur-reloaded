import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preload" href="/fonts/OpenSans-Bold.ttf" as="font" crossOrigin="anonymous"></link>
          <link rel="preload" href="/fonts/OpenSans-Regular.ttf" as="font" crossOrigin="anonymous"></link>
          <link rel="preload" href="/fonts/OpenSans-Semibold.ttf" as="font" crossOrigin="anonymous"></link>
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}