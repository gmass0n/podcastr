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
  hasPrevious: boolean;
  hasNext: boolean;
  play(episode: Episode): void;
  playList(list: Episode[], index: number): void;
  togglePlay(): void;
  toggleLoop(): void;
  setIsPlayingState(state: boolean): void;
  playNext(): void;
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

  const hasPrevious = useMemo(() => currentEpisodeIndex > 0, [
    currentEpisodeIndex,
  ]);
  const hasNext = useMemo(() => currentEpisodeIndex + 1 < episodes.length, [
    currentEpisodeIndex,
    episodes,
  ]);

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

  const setIsPlayingState = useCallback((state: boolean) => {
    setIsPlaying(state);
  }, []);

  const playNext = useCallback(() => {
    if (hasNext) {
      setCurrentEpisodeIndex((prevState) => {
        return prevState + 1;
      });
    }
  }, [hasNext]);

  const playPrevious = useCallback(() => {
    if (hasPrevious) {
      setCurrentEpisodeIndex((prevState) => {
        return prevState - 1;
      });
    }
  }, [hasPrevious]);

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        hasNext,
        hasPrevious,
        play,
        togglePlay,
        toggleLoop,
        playList,
        setIsPlayingState,
        playNext,
        playPrevious,
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
