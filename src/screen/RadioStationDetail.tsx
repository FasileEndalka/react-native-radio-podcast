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
// import Geolocation from 'react-native-geolocation-service';
// import {PERMISSIONS, request} from 'react-native-permissions';

type SearchDetailParams = NativeStackScreenProps<
  SearchStackParamsList,
  'RadioStationDetail'
>;

const RadioStationDetail = ({route}: SearchDetailParams) => {
  const playerContext = usePlayerContext();
  const getRoute = route.params.data;
  const isDarkMode = useColorScheme() === 'dark';
  // const [isGranted, setGranted] = useState('');

  // const getLocation = async () => {
  //   request(
  //     Platform.OS === 'ios'
  //       ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //       : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //   ).then(result => {
  //     setGranted(result);
  //   });
  // };

  // useEffect(() => {
  //   getLocation();
  //   if (isGranted === 'granted') {
  //     Geolocation.getCurrentPosition((r: any) =>
  //       console.log(
  //         'latitude:',
  //         r.coords.latitude,
  //         'longitude',
  //         r.coords.longitude,
  //       ),
  //     );
  //     console.log('get your query');
  //   }
  // });

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
          <Text
            className={` ${isDarkMode && 'text-white'}  text-lg font-bold `}>
            {getRoute.title}
          </Text>
          <Text className={` ${isDarkMode && 'text-white'} text-lg font-bold `}>
            {getRoute.userAgent}
          </Text>
          {/* <Text>{isGranted}</Text> */}
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
