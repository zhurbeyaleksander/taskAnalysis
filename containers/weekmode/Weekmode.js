import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

export default class Weekmode extends Component {
  render() {
    return (
      <View>
        <Text>Режим просмотра недельный</Text>
        <Button
          title="Режим месяца"
          onPress={() => this.props.navigation.navigate('Month')}
        />
      </View>
    );
  }
}
