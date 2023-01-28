import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {usePlayerContext} from '../context/RadioPlayerContext';
import RNTrackPlayer, {Track} from 'react-native-track-player';
const getStation = (item: any) => {
  const PlayingStation: Track = {
    id: item._source.url.split('/')[3],
    artist: '',
    url: `https://radio.garden/api/ara/content/listen/${
      item._source.url.split('/')[3]
    }/channel.mp3`,
    title: item._source.title,
    artwork: require('../assets/Addis_Live.png'),
    userAgent: item._source.subtitle,
  };
  return PlayingStation;
};

type SearchProps = {
  data: any;
};

const SearchList = (props: SearchProps) => {
  const navigation = useNavigation();
  const playTrackContext = usePlayerContext();

  return props.data.length ? (
    <FlatList
      keyboardShouldPersistTaps="never"
      data={props.data}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            className="border-b-2 border-gray-400"
            onPress={async () => {
              playTrackContext.isEmpty = false;
              let trackIndex = await RNTrackPlayer.getCurrentTrack();
              console.log(trackIndex, 'trackIndex');
              if (trackIndex !== undefined) {
                console.log('There is old track list....');
                playTrackContext.playNewStation(getStation(item));
              } else {
                console.log('no Track...');
                playTrackContext.play(getStation(item));
              }

              return navigation.navigate(
                'RadioStationDetail' as never,
                {data: item} as never,
              );
            }}>
            <View className=" py-4 flex-row items-center gap-3 ">
              <View className="w-20 h-20">
                <Image
                  className="flex-1 w-24  rounded-lg"
                  source={require('../assets/Addis_Live.png')}
                />
              </View>
              <View>
                <Text className="text-lg font-bold">{item._source.title}</Text>
                <Text className="text-base">{item._source.subtitle}</Text>
                <Text className="text-base">{item._source.code}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  ) : (
    <View className="items-center  justify-center">
      <Text className="text-lg font-thin">
        No Radio list please search something....
      </Text>
    </View>
  );
};

export default SearchList;
