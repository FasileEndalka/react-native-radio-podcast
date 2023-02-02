import {
  View,
  Text,
  ActivityIndicator,
  useColorScheme,
  Image,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SearchStackParamsList} from '../navigator/types';
import {usePlayerContext} from '../context/RadioPlayerContext';

type SearchDetailParams = NativeStackScreenProps<
  SearchStackParamsList,
  'RadioStationDetail'
>;
const RadioStationDetail = ({route}: SearchDetailParams) => {
  const playerContext = usePlayerContext();
  const getRoute = route.params.data;
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View className="flex-1 items-center justify-center h-screen">
      {playerContext.isBuffering ? (
        <ActivityIndicator size="small" className="pt-2" />
      ) : (
        <View className="flex-1 items-center justify-center h-screen">
          {playerContext.isPlaying ? (
            <Image className="" source={require('../assets/gif/fadeOut.gif')} />
          ) : (
            <Image source={require('../assets/gif/musicPause.png')} />
          )}
          <Text className={` ${isDarkMode && 'text-white'}  text-lg `}>
            {getRoute._source.title}
          </Text>
          <Text className={` ${isDarkMode && 'text-white'} text-lg `}>
            {getRoute._source.subtitle}
          </Text>
        </View>
      )}

      {/*  */}
      {/* {playerContext.isEmpty && (
        <ActivityIndicator size="small" className="pt-2" />
      )} */}
    </View>
  );
};

export default RadioStationDetail;
