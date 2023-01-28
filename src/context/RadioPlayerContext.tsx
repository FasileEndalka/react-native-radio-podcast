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
  play: (track: Track) => void;
  paused: () => void;
  playNewStation: (track: Track) => void;
}

export const PlayerContext = createContext<playerContextType>({
  isPlaying: false,
  isBuffering: false,
  isPaused: false,
  isStopped: false,
  isEmpty: true,
  currentTrack: null,
  isReady: false,
  play: () => null,
  playNewStation: () => null,
  paused: () => null,
});

export const PlayerContextProvider = (props: PropsWithChildren<{}>) => {
  const [playerState, setPlayerState] = useState<null | TrackPlayerState>(null);
  const [currentTrack, setCurrentTrack] = useState<null | Track>(null);

  const play = async (track: Track) => {
    await RNTrackPlayer.add([track]);
    setCurrentTrack(track);
    await RNTrackPlayer.play();
  };
  const playNewStation = async (track: Track) => {
    let trackIndex = await RNTrackPlayer.getCurrentTrack();
    console.log(trackIndex, 'trackIndex');
    await RNTrackPlayer.reset()
      .then(resp =>
        console.log(resp, 'what would be the response when remove track list'),
      )
      .then(async () => {
        console.log('add track ... ');
        await RNTrackPlayer.add([track]);
        setCurrentTrack(track);
      })
      .then(async () => {
        console.log('then play the song ....');
        await RNTrackPlayer.play();
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
    play,
    paused,
    playNewStation,
  };
  return (
    <PlayerContext.Provider value={value}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
