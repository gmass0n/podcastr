import { createContext, useCallback, useContext, useState } from 'react';

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
  play(episode: Episode): void;
};

const PlayerContext = createContext({} as PlayerContextData);

const PlayerProvider: React.FC = ({ children }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const play = useCallback((episode: Episode) => {
    setEpisodes((prevState) => {
      setCurrentEpisodeIndex(prevState.length);

      return [...prevState, episode];
    });
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisodeIndex,
        play,
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
