import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Weekmode} from './containers';
import {MonthScreen} from './containers/monthmode';

const RootStack = createStackNavigator(
  {
    Month: MonthScreen,
    Week: Weekmode,
  },
  {
    initialRouteName: 'Month',
  },
);

export const AppConteiner = createAppContainer(RootStack);
