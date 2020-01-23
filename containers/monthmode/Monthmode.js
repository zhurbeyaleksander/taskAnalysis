import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from '../../components/Button/index';
import {dispatchStore} from '../../utils/StoreUtils';

export default class Monthmode extends Component {
  render() {
    return (
      <View>
        <Text>Режим месяца</Text>
        <Button onPress={() => this.props.navigation.navigate('Week')}>
          Неделя
        </Button>
        <Button onPress={() => dispatchStore('setData', 'name', 'Sasha')}>
          Задать имя
        </Button>
        <Button onPress={() => dispatchStore('getData', 'name')}>
          Посмотреть имя
        </Button>
      </View>
    );
  }
}
