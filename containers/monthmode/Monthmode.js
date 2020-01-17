import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from '../../components/Button/index';

export default class Monthmode extends Component {
  render() {
    return (
      <View>
        <Text>Режим месяца</Text>
        <Button onPress={() => this.props.navigation.navigate('Week')}>
          Неделя
        </Button>
      </View>
    );
  }
}
