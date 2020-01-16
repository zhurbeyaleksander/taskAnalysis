import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {Button as Button2} from '../../components/Button/index';

export default class Monthmode extends Component {
  render() {
    return (
      <View>
        <Text>Режим месяца</Text>
        <Button
          title="Режим недели"
          onPress={() => this.props.navigation.navigate('Week')}
        />
        <Button2>Кнопка</Button2>
      </View>
    );
  }
}
