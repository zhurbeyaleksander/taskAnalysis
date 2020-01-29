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
  noResultSmall: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderBottomColor: '#df3124',
    borderBottomWidth: 2,
    width: 20,
    height: 20,
    paddingTop: 1,
    textAlign: 'center',
    marginLeft: 2,
    fontSize: 10,
  },
  partResultSmall: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderBottomColor: '#6caddf',
    borderBottomWidth: 2,
    width: 15,
    height: 20,
    paddingTop: 1,
    textAlign: 'center',
    marginLeft: 2,
    fontSize: 10,
  },
  allDoneSmall: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderBottomColor: '#00285e',
    borderBottomWidth: 2,
    paddingTop: 1,
    width: 15,
    height: 20,
    textAlign: 'center',
    marginLeft: 2,
    fontSize: 10,
  },
  noMarkedSmall: {
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingTop: 1,
    width: 15,
    height: 20,
    textAlign: 'center',
    marginLeft: 2,
    fontSize: 10,
  },
});
