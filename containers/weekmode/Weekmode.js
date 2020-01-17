import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from '../../components/Button/index';

export default class Weekmode extends Component {
  render() {
    return (
      <View>
        <Text>Режим просмотра недельный</Text>
        <Button onPress={() => this.props.navigation.navigate('Month')}>
          Месяц
        </Button>
      </View>
    );
  }
}
