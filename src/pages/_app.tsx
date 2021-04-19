import Head from 'next/head';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Podcastr</title>
      </Head>

      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
