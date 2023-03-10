import {
  View,
  Text,
  ActivityIndicator,
  useColorScheme,
  Image,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {usePlayerContext} from '../context/RadioPlayerContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const MiniPlayer = () => {
  const context = usePlayerContext();
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('openPlayer' as never)}>
      <View
        className={`${
          isDarkMode ? 'bg-slate-600' : 'bg-red-200'
        }  flex-row px-3 h-16 items-center justify-between `}>
        <View>
          {context.isPlaying ? (
            <Image source={require('../assets/gif/playSignal.gif')} />
          ) : (
            <Image source={require('../assets/waveIcon-small.png')} />
          )}
        </View>
        <View className="pl-3 flex-1 min-w-0">
          <Text
            className={`${
              isDarkMode && 'text-white'
            } font-bold text-sm flex-wrap `}>
            {context.currentTrack?.title}
          </Text>
          <Text className={`${isDarkMode && 'text-white'} font-normal text-sm`}>
            {context.currentTrack?.userAgent}
          </Text>
        </View>

        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={async () => {
              context.skipToPrevious();
            }}>
            <Icon
              name="controller-fast-backward"
              type="entypo"
              color={`${isDarkMode ? '#f87171' : '#31406e'}`}
              size={30}
            />
          </TouchableOpacity>
          {context.isPaused && (
            <TouchableOpacity
              onPress={() => context.play(context.currentTrack!)}>
              <Icon
                name="play-arrow"
                type="MaterialIcons"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={30}
              />
            </TouchableOpacity>
          )}
          {context.isBuffering && <ActivityIndicator size="small" />}
          {context.isPlaying && (
            <TouchableOpacity onPress={() => context.paused()}>
              <Icon
                name="controller-stop"
                type="entypo"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={30}
              />
            </TouchableOpacity>
          )}
          {context.isStopped && (
            <TouchableOpacity
              onPress={() => context.play(context.currentTrack!)}>
              <Icon
                name="controller-stop"
                type="entypo"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={30}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={async () => {
              context.skipToNext();
            }}>
            <Icon
              name="controller-fast-forward"
              type="entypo"
              color={`${isDarkMode ? '#f87171' : '#31406e'}`}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MiniPlayer;
