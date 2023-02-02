import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
import ModalScreen from '../screen/ModalScreen';

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{headerShown: false}}
        name="Tabs"
        component={MainTabNavigator}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
          statusBarAnimation: 'fade',
        }}
        name="openPlayer"
        component={ModalScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
