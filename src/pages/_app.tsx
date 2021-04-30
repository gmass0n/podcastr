import Head from 'next/head';
import { AppProps } from 'next/app';

import { PlayerProvider } from '~/hooks/player';

import { Player } from '~/components/Player';
import { Header } from '~/components/Header';

import styles from '~/styles/app.module.scss';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PlayerProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Podcastr</title>
      </Head>

      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerProvider>
  );
}
export default MyApp;
