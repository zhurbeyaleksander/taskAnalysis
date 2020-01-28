import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {get} from 'lodash';

export default class Day extends Component {
  render() {
    const {date, style} = this.props;
    const dayStyle = get(styles, `${style}`, 'noResult');
    return <Text style={dayStyle}>{date}</Text>;
  }
}

const styles = StyleSheet.create({
  noResult: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#6caddf',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partResult: {
    backgroundColor: '#00285e',
    color: '#6caddf',
    borderColor: '#6caddf',
    borderWidth: 3,
    borderRadius: 25,
    padding: 5,
    width: 40,
    height: 40,
  },
});
