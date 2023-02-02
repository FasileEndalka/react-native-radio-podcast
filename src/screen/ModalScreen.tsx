import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

// import Svg, {Path} from 'react-native-svg';

const ModalScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      className="h-screen ">
      <View className="items-center justify-center">
        <Icon
          onPress={() => navigation.goBack()}
          name="minus"
          type="entypo"
          color="#111827"
          size={45}
        />
      </View>
      <View className="h-60 rounded-lg m-16 shadow-neutral-900 shadow-2xl items-center justify-center">
        <View
          className="border rounded-lg borde "
          style={{backgroundColor: 'rgba(0,0,0,0.005)'}}>
          <Icon
            className="m-12"
            onPress={() => navigation.goBack()}
            name="beamed-note"
            type="entypo"
            color="#111827"
            size={75}
          />
        </View>
      </View>
      <View className="px-4">
        <Text className="text-xl font-bold text-green-50">Control</Text>
        <Text className="text-lg font-normal text-green-50">Zoe Wees</Text>
      </View>
      <View className="px-4 items-center justify-between pt-6 flex-row">
        <View className="w-32 h-1 mx-1 my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
        <Text className="text-white font-bol dark:text-white dark:bg-gray-900">
          LIVE
        </Text>
        <View className="w-32 h-1 mx-1 my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      </View>
      <View className="pt-12">
        <TouchableOpacity>
          <Icon
            name="play-arrow"
            type="MaterialIcons"
            color={`${isDarkMode ? '#f87171' : 'white'}`}
            size={60}
          />
        </TouchableOpacity>
        {/* <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default ModalScreen;
