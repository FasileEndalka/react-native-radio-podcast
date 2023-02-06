import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {usePlayerContext} from '../context/RadioPlayerContext';
import RNTrackPlayer, {Track} from 'react-native-track-player';
import {Icon} from 'react-native-elements';
const mapToTrackObject = (item: any) => {
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

  const loadAndPlay = async (list: Track[]) => {
    playTrackContext.addSearchedStations(list);
  };
  const isItFavorite = (favList: Track[], list: Track): boolean => {
    if (favList.find(f => f.id === list.id)) {
      return true;
    }
    return false;
  };
  const isFavorite = (incoming: Track[], favList: Track[]): Track[] => {
    incoming.map(l => (l.rating = isItFavorite(favList, l)));
    return incoming;
  };

  useEffect(() => {
    const list = props.data.map((e: any) => mapToTrackObject(e));
    loadAndPlay(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return props.data.length ? (
    <FlatList
      className="mb-40"
      keyboardShouldPersistTaps="never"
      data={isFavorite(
        props.data.map((e: any) => mapToTrackObject(e)),
        playTrackContext.favRadioList,
      )}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            className="border-b border-red-200"
            onPress={async () => {
              playTrackContext.isEmpty = false;
              let trackIndex = await RNTrackPlayer.getCurrentTrack();
              if (trackIndex !== undefined) {
                playTrackContext.playNewStation(item);
              } else {
                console.log(item, 'item');
                playTrackContext.play(item);
              }
              return navigation.navigate(
                'RadioStationDetail' as never,
                {data: item} as never,
              );
            }}>
            <View className=" py-4 flex-row items-center gap-3">
              <View className="flex-shrink-0">
                <Image
                  className="w-20 h-20"
                  source={require('../assets/gif/musicPause.png')}
                />
              </View>
              <View className="flex-1 min-w-0">
                <Text
                  className={` ${
                    isDarkMode && 'text-white'
                  } text-lg font-bold  `}>
                  {item.title}
                </Text>
                <Text
                  className={` ${
                    isDarkMode && 'text-white'
                  }  text-base truncate`}>
                  {item.userAgent}
                </Text>
              </View>
              <View className="inline-flex items-center">
                {item.rating ? (
                  <TouchableOpacity
                    onPress={() => {
                      playTrackContext.favHandler(
                        item,
                        playTrackContext.favRadioList,
                      );
                    }}>
                    <Icon
                      name="favorite"
                      type="MaterialIcons"
                      color={`${isDarkMode ? '#f87171' : '#f87171'}`}
                      size={30}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      playTrackContext.favHandler(
                        item,
                        playTrackContext.favRadioList,
                      );
                    }}>
                    <Icon
                      name="favorite-border"
                      type="MaterialIcons"
                      color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                      size={30}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  ) : (
    <View className="items-center justify-center">
      <Text className="text-lg font-thin">No Radio list</Text>
    </View>
  );
};

export default SearchList;
