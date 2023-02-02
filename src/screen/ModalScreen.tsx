import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
  Animated,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {usePlayerContext} from '../context/RadioPlayerContext';
import Slider from '@react-native-community/slider';
// import Svg, {Path} from 'react-native-svg';

const ModalScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const context = usePlayerContext();
  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      className={`${isDarkMode ? 'bg-slate-600' : 'bg-red-200'}  h-screen`}>
      <View className="items-center justify-center ">
        <Icon
          onPress={() => navigation.goBack()}
          name="minus"
          type="entypo"
          color="#111827"
          size={45}
        />
      </View>
      <View className="h-60 rounded-lg m-16 shadow-neutral-900 shadow-2xl items-center justify-center">
        {context.isPlaying ? (
          <Image className="" source={require('../assets/gif/fadeOut.gif')} />
        ) : (
          <Image source={require('../assets/gif/musicPause.png')} />
        )}
      </View>
      <Animated.View style={{}}>
        <View className="px-4">
          <Text
            className={`${
              isDarkMode ? 'text-green-50' : 'text-black'
            }  text-xl font-bold `}>
            {context.currentTrack?.title}
          </Text>
          <Text
            className={`${
              isDarkMode ? 'text-green-50' : 'text-black'
            }  text-lg font-normal  `}>
            {context.currentTrack?.userAgent}
          </Text>
        </View>
        <View className="px-4 items-center justify-between pt-6 flex-row">
          <View className="w-32 h-1 mx-1 my-4 bg-slate-600 border-0 rounded md:my-10 dark:bg-gray-700" />
          <Text className="text-black font-bol dark:text-white dark:bg-gray-900">
            LIVE
          </Text>
          <View className="w-32 h-1 mx-1 my-4 bg-slate-600  border-0 rounded md:my-10 dark:bg-gray-700" />
        </View>
        <View className="pt-12">
          {context.isPlaying && (
            <TouchableOpacity onPress={() => context.paused()}>
              <Icon
                name="controller-stop"
                type="entypo"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={60}
              />
            </TouchableOpacity>
          )}
          {context.isPaused && (
            <TouchableOpacity
              onPress={() => context.play(context.currentTrack!)}>
              <Icon
                name="play-arrow"
                type="MaterialIcons"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={60}
              />
            </TouchableOpacity>
          )}
          <View className="items-center justify-center flex-row  gap-1 pt-10">
            <View>
              <Icon
                name="volume-none"
                type="foundation"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={30}
              />
            </View>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="brown"
              maximumTrackTintColor="#31406e"
            />
            <View>
              <Icon
                name="volume"
                type="foundation"
                color={`${isDarkMode ? '#f87171' : '#31406e'}`}
                size={30}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ModalScreen;
