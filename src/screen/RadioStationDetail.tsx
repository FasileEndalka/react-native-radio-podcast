import {View, Text, ActivityIndicator} from 'react-native';
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

  return (
    <View className="flex-1 items-center justify-center h-screen">
      <Text className="text-lg ">{getRoute._source.title}</Text>
      <Text className="text-lg ">{getRoute._source.subtitle}</Text>
      {playerContext.isBuffering && <ActivityIndicator size="small" />}
      {playerContext.isEmpty && <ActivityIndicator size="small" />}
    </View>
  );
};

export default RadioStationDetail;
