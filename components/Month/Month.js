import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: null,
      year: null,
    };
  }

  render() {
    return (
      <View>
        <Text>Месяц</Text>
      </View>
    );
  }
}
