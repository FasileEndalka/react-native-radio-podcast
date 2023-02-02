import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {usePlayerContext} from '../context/RadioPlayerContext';

const ListenNowScreen = () => {
  const playerListContext = usePlayerContext();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      {playerListContext.favRadioList.length ? (
        <View className={'p-4  h-screen'}>
          <Text className={`${isDarkMode && 'text-white'} text-3xl font-bold`}>
            Radio
          </Text>
          <FlatList
            className="mb-52"
            keyExtractor={(item, index) => `key-${index}`}
            data={playerListContext.favRadioList}
            renderItem={({item}): any => {
              return (
                <View>
                  <Text
                    className={`${
                      isDarkMode && 'text-white'
                    } text-base font-bold pt-3`}>
                    {item.title}
                  </Text>
                  <Text
                    className={
                      isDarkMode
                        ? 'text-white text-base font-normal pb-2'
                        : 'text-base font-normal pb-2'
                    }>
                    Radio station from {item.userAgent}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      playerListContext.playNewStation(item);
                    }}>
                    <View className="bg-red-300 w-auto h-96 rounded-2xl flex-col-reverse px-4 py-3 justify-between ">
                      <View className="flex flex-row justify-between items-center">
                        <View>
                          <Text>Live . 10-11PM</Text>
                          <Text className="text-xl font-semibold">
                            {item.title}
                          </Text>
                          <Text>{item.userAgent}</Text>
                        </View>
                        <View>
                          <Icon
                            name="play-circle-outline"
                            type="MaterialIcons"
                            color={'#31406e'}
                            size={25}
                          />
                        </View>
                      </View>
                      <View className="p-12">
                        <Icon
                          name="beamed-note"
                          type="entypo"
                          color={'#31406e'}
                          size={195}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View className="items-center justify-center h-1/2">
          <Text>No content</Text>
        </View>
      )}
    </>
  );
};

export default ListenNowScreen;
