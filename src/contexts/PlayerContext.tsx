import { createContext, ReactNode, useContext, useState } from "react";

type Episode = {
  title: string;
  member: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  hasPrevius: boolean;
  hasNext: boolean;
  isLooping: boolean;
  isShuffle: boolean;
  toggleLoop: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  clearPlayerState: () => void;
  playPrevious: () => void;
  playList: (list: Episode[], index: number) => void;
  setPlayingState: (state: boolean) => void;
  play: (episode: Episode) => void;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasPrevius = currentEpisodeIndex > 0;
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const nextEpisodeIndex = currentEpisodeIndex + 1;
  const hasNext = isShuffle || currentEpisodeIndex + 1 < episodeList.length;

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffle(!isShuffle);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  function playNext() {
    if (isShuffle) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(nextEpisodeIndex);
    } else return;
  }

  function playPrevious() {
    const prevEpisodeIndex = currentEpisodeIndex - 1;
    if (!hasPrevius) {
      return;
    }
    setCurrentEpisodeIndex(prevEpisodeIndex);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        playPrevious,
        playList,
        playNext,
        hasPrevius,
        hasNext,
        isPlaying,
        togglePlay,
        setPlayingState,
        isLooping,
        isShuffle,
        toggleShuffle,
        toggleLoop,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
