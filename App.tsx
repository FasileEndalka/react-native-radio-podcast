import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import MainStackNavigator from './src/navigator/MainStackNavigator';
import TrackPlayer from 'react-native-track-player';
import {PlayerContextProvider} from './src/context/RadioPlayerContext';
import {Text, useColorScheme, View} from 'react-native';
import {darkTheme, lightTheme} from './src/theme/theme';

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer({waitForBuffer: true}).then(() => {
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
        ],
      });
      setIsReady(true);
      console.log('player is ready...');
    });
  };
  React.useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
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
