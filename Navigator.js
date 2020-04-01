import * as React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MonthScreen} from './containers/MonthScreen';
import {YearScreen} from './containers/YearScreen';
import {DayScreen} from './containers/DayScreen';
import {AddTaskScreen} from './containers/AddTaskScreen';
import {ManageTaskScreen} from './containers/ManageTaskScreen';
import {HeaderBar} from './components/HeaderBar';
import {ETypeLeftHeaderBtn} from './models/appModels';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Day">
        <Stack.Screen
          name="Year"
          component={YearScreen}
          options={({navigation}) => ({
            headerTitle: props => <HeaderBar title={'Прогресс за год'} />,
            headerLeft: () => <Text></Text>,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ManageTask')}>
                <Text>|||</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#B0C4DE',
            },
          })}
        />
        <Stack.Screen
          name="Month"
          component={MonthScreen}
          options={({navigation}) => ({
            headerTitle: props => <HeaderBar title={'Прогресс за месяц'} />,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Year')}>
                <Text>Год</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ManageTask')}>
                <Text>|||</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#B0C4DE',
            },
          })}
        />
        <Stack.Screen
          name="Day"
          component={DayScreen}
          options={({navigation}) => ({
            headerTitle: props => <HeaderBar title={'Прогресс за день'} />,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Month')}>
                <Text>Месяц</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ManageTask')}>
                <Text>|||</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#B0C4DE',
            },
          })}
        />
        <Stack.Screen
          name="ManageTask"
          component={ManageTaskScreen}
          options={({navigation}) => ({
            headerTitle: props => <HeaderBar title={'Управление задачами'} />,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Назад</Text>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#B0C4DE',
            },
          })}
        />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const AppConteiner = RootStack;
