import * as React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {MonthScreen} from './containers/MonthScreen';
import {YearScreen} from './containers/YearScreen';
import {DayScreen} from './containers/DayScreen';
import {AddTaskScreen} from './containers/AddTaskScreen';
import {ManageTaskScreen} from './containers/ManageTaskScreen';
import {EditTaskScreen} from './containers/EditTaskScreen';
import {HeaderBar, HeaderManageIcon} from './components/HeaderBar';

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
                <HeaderManageIcon />
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
                <View style={styles.wrapleftBtn}>
                  <Image
                    style={styles.leftBtnImg}
                    source={require('./assets/img/leftArr_.png')}
                  />
                  <Text style={styles.leftBtnText}>Год</Text>
                </View>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ManageTask')}>
                <HeaderManageIcon />
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
                <View style={styles.wrapleftBtn}>
                  <Image style={styles.leftBtnImg} source={require('./assets/img/leftArr_.png')} />
                  <Text style={styles.leftBtnText}>Месяц</Text>
                </View>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('ManageTask')}>
                <HeaderManageIcon />
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
            headerTitle: props => <HeaderBar title={'Управление задачами'} nav={navigation} />,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.wrapleftBtn}>
                  <Image
                    style={styles.leftBtnImg}
                    source={require('./assets/img/leftArr_.png')}
                  />
                  <Text style={styles.leftBtnText}>Назад</Text>
                </View>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#B0C4DE',
            },
          })}
        />
        <Stack.Screen
          name="EditTask"
          component={EditTaskScreen}
          options={({navigation}) => ({
            headerTitle: props => <HeaderBar title={'Редактирование задачи'} />,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.wrapleftBtn}>
                  <Image
                    style={styles.leftBtnImg}
                    source={require('./assets/img/leftArr_.png')}
                  />
                  <Text style={styles.leftBtnText}>Назад</Text>
                </View>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#B0C4DE',
            },
          })}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={({navigation}) => ({
            headerTitle: props => <HeaderBar title={'Добавление задачи'} />,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={styles.wrapleftBtn}>
                  <Image
                    style={styles.leftBtnImg}
                    source={require('./assets/img/leftArr_.png')}
                  />
                  <Text style={styles.leftBtnText}>Назад</Text>
                </View>
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#B0C4DE',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  wrapleftBtn: {
    flex: 3,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
  },
  leftBtnText: {
    flex: 2,
    color: '#002338',
    fontFamily: 'Montserrat-Regular',
    marginLeft: 5,
    marginTop: 3,
    fontSize: 16,
  },
  leftBtnImg: {
    flex: 1,
  },
});

export const AppConteiner = RootStack;
