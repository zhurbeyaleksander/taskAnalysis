import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Weekmode} from './containers';
import {MonthScreen} from './containers/monthmode';
import {YearScreen} from './containers/YearScreen';

const RootStack = createStackNavigator(
  {
    Month: MonthScreen,
    Week: Weekmode,
    Year: YearScreen,
  },
  {
    initialRouteName: 'Year',
  },
);

export const AppConteiner = createAppContainer(RootStack);
