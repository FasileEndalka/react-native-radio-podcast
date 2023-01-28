import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStackNavigator from './src/navigator/MainStackNavigator';
import TrackPlayer from 'react-native-track-player';
import PlayBackServices from './src/services/trackPlayerServices';
import {PlayerContextProvider} from './src/context/RadioPlayerContext';
import {Text, View} from 'react-native';

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer().then(() => {
      setIsReady(true);
      console.log('player is ready...');
    });
  };
  React.useEffect(() => {
    TrackPlayer.registerPlaybackService(() => PlayBackServices);
    setupPlayer();
  }, []);
  return (
    <NavigationContainer>
      {isReady ? (
        <PlayerContextProvider>
          <MainStackNavigator />
        </PlayerContextProvider>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </NavigationContainer>
  );
};

export default App;
