import {View, Text, ActivityIndicator, useColorScheme} from 'react-native';
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
        <View className="flex-row items-center ">
          <View className="h-auto ">
            <Icon
              name="beamed-note"
              type="entypo"
              color={`${isDarkMode ? '#f87171' : '#31406e'}`}
              size={25}
            />
          </View>

          <View className="pl-3">
            <Text
              className={`${
                isDarkMode && 'text-white'
              } font-bold text-lg flex-wrap `}>
              {context.currentTrack?.title}
            </Text>
            <Text
              className={`${isDarkMode && 'text-white'} font-normal text-sm`}>
              {context.currentTrack?.userAgent}
            </Text>
          </View>
        </View>
        <View>
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
          {context.isPlaying && (
            <TouchableOpacity onPress={() => context.paused()}>
              <Icon
                name="pause"
                type="MaterialIcons"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={30}
              />
            </TouchableOpacity>
          )}
          {context.isStopped && (
            <TouchableOpacity
              onPress={() => context.play(context.currentTrack!)}>
              <Icon
                name="pause"
                type="MaterialIcons"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={30}
              />
            </TouchableOpacity>
          )}
          {context.isBuffering && <ActivityIndicator size="small" />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MiniPlayer;
