import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{headerShown: false}}
        name="Tabs"
        component={MainTabNavigator}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
