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
  play: (track: Track) => void;
  paused: () => void;
  playNewStation: (track: Track) => void;
  recentRadioList: (track: Track, store: Track[]) => void;
  addToStorage: (value: Track[]) => Promise<void>;
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
  play: () => null,
  playNewStation: () => null,
  paused: () => null,
  recentRadioList: () => null,
  addToStorage: async () => undefined,
});

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const [playerState, setPlayerState] = useState<null | TrackPlayerState>(null);
  const [currentTrack, setCurrentTrack] = useState<null | Track>(null);
  const [favRadioList, setFavRadioList] = useState<Track[]>([]);

  const recentRadioList = (track: Track, store: Track[]) => {
    if (store.find(l => l.id === track.id) !== undefined) {
      return null;
    }
    addToStorage([track, ...favRadioList]);
    return setFavRadioList(s => [track, ...s]);
  };

  useEffect(() => {
    if (!favRadioList.length) {
      getSelectedList();
    }
  }, [favRadioList]);

  const addToStorage = async (rData: Track[]) => {
    try {
      const jsonValue = JSON.stringify(rData);
      await AsyncStorage.setItem('played-stations', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getSelectedList = async () => {
    try {
      await AsyncStorage.removeItem('played-stations');
      const JsonValue = await AsyncStorage.getItem('played-stations');
      const value = JSON.parse(JsonValue as string);
      if (value !== null) {
        setFavRadioList(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const play = async (track: Track) => {
    await RNTrackPlayer.add([track]).then(async () => {
      setCurrentTrack(track);
      await RNTrackPlayer.play();
    });
  };
  const playNewStation = async (track: Track) => {
    await RNTrackPlayer.reset().then(async () => {
      await RNTrackPlayer.add([track]).then(async () => {
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
    play,
    paused,
    playNewStation,
    recentRadioList,
    addToStorage,
  };

  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
