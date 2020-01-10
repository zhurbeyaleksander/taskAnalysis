import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Monthmode, Weekmode} from './containers';

const RootStack = createStackNavigator(
  {
    Month: Monthmode,
    Week: Weekmode,
  },
  {
    initialRouteName: 'Month',
  },
);

export const AppConteiner = createAppContainer(RootStack);
