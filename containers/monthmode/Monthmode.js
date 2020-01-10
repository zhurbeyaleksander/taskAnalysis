import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';

export default class Monthmode extends Component {
  render() {
    return (
      <View>
        <Text>Режим месяца</Text>
        <Button
          title="Режим недели"
          onPress={() => this.props.navigation.navigate('Week')}
        />
      </View>
    );
  }
}
