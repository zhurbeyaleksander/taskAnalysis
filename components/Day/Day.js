import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {get} from 'lodash';
import * as moment from 'moment';
import {utc} from 'moment';

export default class Day extends Component {
  isToday = () => {
    const {day} = this.props;
    const currentDay = new Date();
    return utc(currentDay).format('YYYY-MM-DD') === utc(day).format('YYYY-MM-DD');
  };

  render() {
    const {date, style, mode} = this.props;
    const isToday = this.isToday();
    const dayStyle = isToday ? get(styles, 'todaySmall', 'noResult') : get(styles, `${style}`, 'noResult');
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
  todaySmall: {
    backgroundColor: '#B0C4DE',
    color: '#ffffff',
    borderBottomColor: '#B0C4DE',
    borderBottomWidth: 2,
    paddingTop: 1,
    width: 15,
    height: 17,
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
  noMarkedBig: {
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingTop: 1,
    width: 55,
    height: 60,
    textAlign: 'center',
    marginLeft: 2,
    fontSize: 20,
  },
});
