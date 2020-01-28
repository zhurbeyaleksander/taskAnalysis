import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';

export default class Spinner extends Component {
  render() {
    return <ActivityIndicator size="large" color="#B0C4DE" />;
  }
}
