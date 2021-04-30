import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

export type Episode = {
  id: string;
  title: string;
  members: string;
  duration: number;
  url: string;
  thumbnail: string;
};

type PlayerContextData = {
  episodes: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play(episode: Episode): void;
  playList(list: Episode[], index: number): void;
  togglePlay(): void;
  setIsPlayingState(state: boolean): void;
};

const PlayerContext = createContext({} as PlayerContextData);

type PlayerProviderProps = {
  children: ReactNode;
};

const PlayerProvider = ({ children }: PlayerProviderProps): JSX.Element => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const setIsPlayingState = useCallback((state: boolean) => {
    setIsPlaying(state);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisodeIndex,
        isPlaying,
        play,
        togglePlay,
        playList,
        setIsPlayingState,
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
