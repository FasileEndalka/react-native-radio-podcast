import TrackPlayer from 'react-native-track-player';

const PlayBackServices = async () => {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
  TrackPlayer.addEventListener('playback-state', state => {
    console.log('PlayBackState', state);
  });
};
export default PlayBackServices;
