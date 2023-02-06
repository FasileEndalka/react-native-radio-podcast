import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {createContext, PropsWithChildren, useEffect, useState} from 'react';
import RNTrackPlayer, {
  Track,
  State as TrackPlayerState,
  STATE_PLAYING,
  STATE_STOPPED,
  STATE_BUFFERING,
  STATE_PAUSED,
  STATE_READY,
} from 'react-native-track-player';

interface playerContextType {
  isPlaying: boolean;
  isBuffering: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isEmpty: boolean;
  isReady: boolean;
  currentTrack: Track | null;
  favRadioList: Track[];
  searchedRadioList: Track[];
  play: (track: Track) => void;
  paused: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  playNewStation: (track: Track) => void;
  favHandler: (track: Track, store: Track[]) => void;
  addToStorage: (value: Track[]) => Promise<void>;
  addSearchedStations: (list: Track[]) => void;
  getStoredStations: () => void;
}

export const PlayerContext = createContext<playerContextType>({
  isPlaying: false,
  isBuffering: false,
  isPaused: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  isReady: false,
  favRadioList: [],
  searchedRadioList: [],
  play: () => null,
  playNewStation: () => null,
  paused: () => null,
  favHandler: () => null,
  addToStorage: async () => undefined,
  addSearchedStations: () => null,
  skipToNext: () => null,
  skipToPrevious: () => null,
  getStoredStations: () => null,
});

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const [playerState, setPlayerState] = useState<null | TrackPlayerState>(null);
  const [currentTrack, setCurrentTrack] = useState<null | Track>(null);
  const [favRadioList, setFavRadioList] = useState<Track[]>([]);
  const [searchedRadioList, setSearchedRadioList] = useState<Track[]>([]);
  const setFavValue = (track: Track) => {
    track.rating = true;
    return track;
  };
  const favHandler = (track: Track, store: Track[]) => {
    if (store.find(l => l.id === track.id) !== undefined) {
      return null;
    }
    addToStorage([setFavValue(track), ...favRadioList]);
    return setFavRadioList(s => [track, ...s]);
  };

  useEffect(() => {
    if (!favRadioList.length) {
      getStoredStations();
    }
  }, [favRadioList]);

  const addSearchedStations = (list: Track[]) => {
    setSearchedRadioList(list);
  };

  const skipToPrevious = async () => {
    await RNTrackPlayer.skipToPrevious().then(async () => {
      const currentTrackId = await RNTrackPlayer.getCurrentTrack();
      const trackObj = await RNTrackPlayer.getTrack(currentTrackId);
      setCurrentTrack(trackObj);
    });
  };
  const skipToNext = async () => {
    await RNTrackPlayer.skipToNext().then(async () => {
      const currentTrackId = await RNTrackPlayer.getCurrentTrack();
      const trackObj = await RNTrackPlayer.getTrack(currentTrackId);
      setCurrentTrack(trackObj);
    });
  };

  const addToStorage = async (rData: Track[]) => {
    try {
      const jsonValue = JSON.stringify(rData);
      await AsyncStorage.setItem('played-stations', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getStoredStations = async () => {
    try {
      // await AsyncStorage.removeItem('played-stations');
      const JsonValue = await AsyncStorage.getItem('played-stations');
      const value = JSON.parse(JsonValue as string);
      if (value !== null) {
        setFavRadioList(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const play = async () => {
    await RNTrackPlayer.reset();
    await RNTrackPlayer.add([...searchedRadioList]).then(async () => {
      const currentTrackId = await RNTrackPlayer.getCurrentTrack();
      const trackObj = await RNTrackPlayer.getTrack(currentTrackId);
      setCurrentTrack(trackObj);
      await RNTrackPlayer.play();
    });
  };
  const playNewStation = async (track: Track) => {
    await RNTrackPlayer.reset().then(async () => {
      await RNTrackPlayer.add([track, ...searchedRadioList]).then(async () => {
        await RNTrackPlayer.play();
      });
      setCurrentTrack(track);
    });
  };
  const paused = async () => {
    await RNTrackPlayer.pause();
  };
  useEffect(() => {
    const trackListener = RNTrackPlayer.addEventListener(
      'playback-state',
      ({state}: {state: TrackPlayerState}) => setPlayerState(state),
    );
    return () => {
      trackListener.remove();
    };
  });
  const value: playerContextType = {
    isPlaying: playerState === STATE_PLAYING,
    isStopped: playerState === STATE_STOPPED,
    isBuffering: playerState === STATE_BUFFERING,
    isPaused: playerState === STATE_PAUSED,
    isEmpty: playerState === null,
    isReady: playerState === STATE_READY,
    currentTrack,
    favRadioList,
    searchedRadioList,
    play,
    paused,
    playNewStation,
    favHandler,
    addToStorage,
    addSearchedStations,
    skipToNext,
    skipToPrevious,
    getStoredStations,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
