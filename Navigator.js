import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MonthScreen} from './containers/MonthScreen';
import {YearScreen} from './containers/YearScreen';
import {DayScreen} from './containers/DayScreen';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Year">
        <Stack.Screen name="Year" component={YearScreen} />
        <Stack.Screen name="Month" component={MonthScreen} />
        <Stack.Screen name="Day" component={DayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const AppConteiner = RootStack;
