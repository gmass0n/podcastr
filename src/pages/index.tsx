import Image from 'next/image';
import { GetStaticProps, NextPage } from 'next';
import { ptBR } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { api } from '~/services/api';

import styles from '~/styles/pages/home.module.scss';

import { convertDurationToTimeString } from '~/utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string[];
  duration: number;
  durationAsString: string;
  publishedAt: string;
};

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: episodes } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const formattedEpisodes = episodes.map((episode) => {
    const formattedPublishedAt = format(
      parseISO(episode.published_at),
      'd MMM yy',
      { locale: ptBR }
    );

    return {
      ...episode,
      publishedAt: formattedPublishedAt,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    };
  });

  const latestEpisodes = formattedEpisodes.slice(0, 2);
  const allEpisodes = formattedEpisodes.slice(2, formattedEpisodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};

const Home: NextPage<HomeProps> = ({ allEpisodes, latestEpisodes }) => {
  return (
    <div className={styles.container}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>

        <ul>
          {latestEpisodes.map((episode) => (
            <li key={episode.id}>
              <div style={{ width: '5rem' }}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
              </div>

              <div className={styles.episodeDetails}>
                <a href="@">{episode.title}</a>

                <p>{episode.members}</p>

                <span>{episode.publishedAt}</span>

                <span>{episode.durationAsString}</span>
              </div>

              <button type="button">
                <img src="/play-green.svg" alt="Tocar episódio" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>

        <table cellSpacing={0}>
          <thead>
            <th />

            <th>Podcast</th>

            <th>Integrantes</th>

            <th>Data</th>

            <th>Duração</th>

            <th />
          </thead>

          <tbody>
            {allEpisodes.map((episode) => (
              <tr key={episode.id}>
                <td style={{ width: 72 }}>
                  <Image
                    src={episode.thumbnail}
                    width={120}
                    height={120}
                    alt={episode.title}
                    objectFit="cover"
                  />
                </td>

                <td>
                  <a href="2">{episode.title}</a>
                </td>

                <td>{episode.members}</td>

                <td style={{ width: 100 }}>{episode.publishedAt}</td>

                <td>{episode.durationAsString}</td>

                <td>
                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Home;
