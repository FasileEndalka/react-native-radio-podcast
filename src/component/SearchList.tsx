import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {usePlayerContext} from '../context/RadioPlayerContext';
import RNTrackPlayer, {Track} from 'react-native-track-player';
import {Icon} from 'react-native-elements';
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
  const isDarkMode = useColorScheme() === 'dark';

  return props.data.length ? (
    <FlatList
      keyboardShouldPersistTaps="never"
      data={props.data}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            className="border-b border-red-200"
            onPress={async () => {
              playTrackContext.isEmpty = false;
              let trackIndex = await RNTrackPlayer.getCurrentTrack();
              if (trackIndex !== undefined) {
                playTrackContext.playNewStation(getStation(item));
              } else {
                playTrackContext.play(getStation(item));
              }
              playTrackContext.recentRadioList(
                getStation(item),
                playTrackContext.favRadioList,
              );
              return navigation.navigate(
                'RadioStationDetail' as never,
                {data: item} as never,
              );
            }}>
            <View className=" py-4 flex-row items-center gap-3 ">
              <View className="w-20 h-20 items-center justify-center">
                <Icon
                  name="beamed-note"
                  type="entypo"
                  color={'#f87171'}
                  size={45}
                />
              </View>
              <View>
                <Text
                  className={` ${
                    isDarkMode && 'text-white'
                  } text-lg font-bold`}>
                  {item._source.title}
                </Text>
                <Text className={` ${isDarkMode && 'text-white'}  text-base`}>
                  {item._source.subtitle}
                </Text>
                <Text className={` ${isDarkMode && 'text-white'}  text-base`}>
                  {item._source.code}
                </Text>
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
