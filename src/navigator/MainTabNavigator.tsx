import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Icon} from '@rneui/themed';
import LibraryScreen from '../screen/LibraryScreen';
import SearchScreen from '../screen/SearchScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ListenNowScreen from '../screen/ListenNowScreen';
import RadioStationDetail from '../screen/RadioStationDetail';
import {SearchStackParamsList} from './types';
import MiniPlayer from '../component/MiniPlayer';
import {usePlayerContext} from '../context/RadioPlayerContext';
import {useColorScheme} from 'react-native';

const SearchStack = createStackNavigator<SearchStackParamsList>();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        options={{headerTitle: 'Search', headerTintColor: '#f87171'}}
        component={SearchScreen}
      />
      <SearchStack.Screen
        options={{
          headerTitle: 'Detail',
          headerTintColor: '#f87171',
        }}
        name="RadioStationDetail"
        component={RadioStationDetail}
      />
    </SearchStack.Navigator>
  );
};

const MainTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const playTrackContext = usePlayerContext();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Tab.Navigator
      tabBar={tabProps => (
        <>
          {!playTrackContext.isEmpty && <MiniPlayer />}
          <BottomTabBar {...tabProps} />
        </>
      )}
      screenOptions={({route}) => ({
        headerTransparent: false,
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'Listen Now':
              return (
                <Icon
                  name="play-circle-outline"
                  type="MaterialIcons"
                  color={focused ? '#f87171' : isDarkMode ? 'white' : '#31406e'}
                  size={25}
                />
              );
            case 'Radio':
              return (
                <Icon
                  name="radio"
                  type="Feather"
                  color={
                    focused ? (isDarkMode ? 'white' : '#f87171') : '#31406e'
                  }
                  size={25}
                />
              );
            case 'Library':
              return (
                <Icon
                  name="my-library-music"
                  type="MaterialIcons"
                  color={focused ? '#f87171' : isDarkMode ? 'white' : '#31406e'}
                  size={25}
                />
              );
            case 'Search':
              return (
                <Icon
                  name="search"
                  type="MaterialIcons"
                  color={focused ? '#f87171' : isDarkMode ? 'white' : '#31406e'}
                  size={25}
                />
              );

            default:
              break;
          }
        },
      })}>
      <Tab.Screen
        options={{headerTintColor: '#f87171'}}
        name="Listen Now"
        component={ListenNowScreen}
      />
      {/* <Tab.Screen name="Radio" component={ListenNowStackNavigator} /> */}
      <Tab.Screen
        options={{headerTintColor: '#f87171'}}
        name="Library"
        component={LibraryScreen}
      />
      <Tab.Screen
        name="Search"
        options={{headerTintColor: '#f87171', headerShown: false}}
        component={SearchStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
