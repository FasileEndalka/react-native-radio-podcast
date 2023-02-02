import {View, Text, ActivityIndicator, useColorScheme} from 'react-native';
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
      <Text className={` ${isDarkMode && 'text-white'}  text-lg `}>
        {getRoute._source.title}
      </Text>
      <Text className={` ${isDarkMode && 'text-white'} text-lg `}>
        {getRoute._source.subtitle}
      </Text>
      {playerContext.isBuffering && (
        <ActivityIndicator size="small" className="pt-2" />
      )}
      {playerContext.isEmpty && (
        <ActivityIndicator size="small" className="pt-2" />
      )}
    </View>
  );
};

export default RadioStationDetail;
