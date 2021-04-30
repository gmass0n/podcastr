/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useEffect, useRef, useState } from 'react';

import Slider from 'rc-slider';
import Image from 'next/image';

import { usePlayer, Episode } from '~/hooks/player';

import { convertDurationToTimeString } from '~/utils/convertDurationToTimeString';

import styles from './styles.module.scss';

import 'rc-slider/assets/index.css';

export const Player = (): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    episodes,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    hasNext,
    hasPrevious,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setIsPlayingState,
    playNext,
    clearPlayerState,
    playPrevious,
  } = usePlayer();

  const [episode, setEpisode] = useState<Episode | undefined>(undefined);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (episodes[currentEpisodeIndex]) {
      setEpisode(episodes[currentEpisodeIndex]);
    }
  }, [episodes, currentEpisodeIndex]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  const setupProgressListener = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }, []);

  const handleSeek = useCallback((duration: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = duration;
    setProgress(duration);
  }, []);

  const handleEpisodeEnded = useCallback(() => {
    if (hasNext) {
      playNext();
    } else {
      clearPlayerState();
    }
  }, [hasNext, clearPlayerState, playNext]);

  return (
    <aside className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />

        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />

          <strong>{episode.title}</strong>

          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast agora</strong>
        </div>
      )}

      <footer className={episode ? '' : styles.empty}>
        <div className={styles.progress}>
          <span>{convertDurationToTimeString(progress)}</span>

          <div className={styles.slider}>
            {episode ? (
              <Slider
                value={progress}
                onChange={handleSeek}
                onAfterChange={() => setIsPlayingState(true)}
                onBeforeChange={() => setIsPlayingState(false)}
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>

          <span>{episode?.durationAsString ?? '00:00:00'}</span>
        </div>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.url}
            autoPlay
            loop={isLooping}
            onEnded={handleEpisodeEnded}
            onPlay={() => setIsPlayingState(true)}
            onPause={() => setIsPlayingState(false)}
            onLoadedMetadata={setupProgressListener}
          />
        )}

        <div className={styles.buttons}>
          <button
            type="button"
            disabled={!episode || episodes.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>

          <button
            type="button"
            disabled={!episode || !hasPrevious}
            onClick={playPrevious}
          >
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button
            type="button"
            className={styles.playButton}
            onClick={togglePlay}
            disabled={!episode}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausando" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>

          <button
            type="button"
            disabled={!episode || !hasNext}
            onClick={playNext}
          >
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>

          <button
            type="button"
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </aside>
  );
};
