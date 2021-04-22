/* eslint-disable react/no-danger */
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ptBR } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { api } from '~/services/api';

import styles from '~/styles/pages/episode.module.scss';

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

type EpisodeProps = {
  episode: Episode;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data: episode } = await api.get(
    `/episodes/${context.params.episodeId}`
  );

  const formattedPublishedAt = format(
    parseISO(episode.published_at),
    'd MMM yy',
    { locale: ptBR }
  );

  const formattedEpisode = {
    ...episode,
    publishedAt: formattedPublishedAt,
    duration: Number(episode.file.duration),
    durationAsString: convertDurationToTimeString(
      Number(episode.file.duration)
    ),
    url: episode.file.url,
  };

  return {
    props: {
      episode: formattedEpisode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

const Episode: NextPage<EpisodeProps> = ({ episode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>

        <Image
          width={700}
          height={220}
          src={episode.thumbnail}
          alt={episode.title}
        />

        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>

        <span>{episode.members}</span>

        <span>{episode.publishedAt}</span>

        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
};

export default Episode;
