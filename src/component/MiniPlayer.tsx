import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {usePlayerContext} from '../context/RadioPlayerContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MiniPlayer = () => {
  const context = usePlayerContext();
  return (
    <View className="bg-red-200 flex-row px-3 h-16 items-center justify-between ">
      <View className="flex-row items-center ">
        <View className="h-auto ">
          <Icon
            name="music-note"
            type="MaterialIcons"
            color={'black'}
            size={40}
          />
        </View>

        <View className="pl-3">
          <Text className="font-bold text-lg flex-wrap ">
            {context.currentTrack?.title}
          </Text>
          <Text className="font-normal text-sm">
            {context.currentTrack?.userAgent}
          </Text>
        </View>
      </View>
      <View>
        {context.isPaused && (
          <TouchableOpacity onPress={() => context.play(context.currentTrack!)}>
            <Icon
              name="play-arrow"
              type="MaterialIcons"
              color={'black'}
              size={30}
            />
          </TouchableOpacity>
        )}
        {context.isPlaying && (
          <TouchableOpacity onPress={() => context.paused()}>
            <Icon name="pause" type="MaterialIcons" color={'black'} size={30} />
          </TouchableOpacity>
        )}
        {context.isStopped && (
          <TouchableOpacity onPress={() => context.play(context.currentTrack!)}>
            <Icon name="pause" type="MaterialIcons" color={'black'} size={30} />
          </TouchableOpacity>
        )}
        {context.isBuffering && <ActivityIndicator size="small" />}
      </View>
    </View>
  );
};

export default MiniPlayer;
