import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  publishedAt: string;
  url: string;
};

type PlayerContextData = {
  episodes: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  play(episode: Episode): void;
  playList(list: Episode[], index: number): void;
  togglePlay(): void;
  toggleLoop(): void;
  toggleShuffle(): void;
  setIsPlayingState(state: boolean): void;
  playNext(): void;
  clearPlayerState(): void;
  playPrevious(): void;
};

const PlayerContext = createContext({} as PlayerContextData);

type PlayerProviderProps = {
  children: ReactNode;
};

const PlayerProvider = ({ children }: PlayerProviderProps): JSX.Element => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const hasPrevious = useMemo(() => isShuffling || currentEpisodeIndex > 0, [
    currentEpisodeIndex,
    isShuffling,
  ]);
  const hasNext = useMemo(
    () => isShuffling || currentEpisodeIndex + 1 < episodes.length,
    [currentEpisodeIndex, episodes, isShuffling]
  );

  const play = useCallback((episode: Episode) => {
    setEpisodes((prevState) => {
      setCurrentEpisodeIndex(prevState.length);
      setIsPlaying(true);

      return [...prevState, episode];
    });
  }, []);

  const playList = useCallback((list: Episode[], index: number) => {
    setEpisodes(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prevState) => !prevState);
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((prevState) => !prevState);
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffling((prevState) => !prevState);
  }, []);

  const setIsPlayingState = useCallback((state: boolean) => {
    setIsPlaying(state);
  }, []);

  const playNext = useCallback(() => {
    if (hasNext) {
      setCurrentEpisodeIndex((prevState) => {
        if (isShuffling) {
          return Math.floor(Math.random() * episodes.length);
        }

        return prevState + 1;
      });
    }
  }, [hasNext, episodes, isShuffling]);

  const playPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentEpisodeIndex((prevState) => {
        if (isShuffling) {
          return Math.floor(Math.random() * episodes.length);
        }

        return prevState - 1;
      });
    }
  }, [hasPrevious, isShuffling, episodes]);

  const clearPlayerState = useCallback(() => {
    setEpisodes([]);
    setCurrentEpisodeIndex(0);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        hasNext,
        hasPrevious,
        play,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        playList,
        setIsPlayingState,
        playNext,
        playPrevious,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

const usePlayer = (): PlayerContextData => {
  return useContext(PlayerContext);
};

export { PlayerProvider, usePlayer };
