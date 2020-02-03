import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Day} from '../../components/Day/index';
import {isNumber} from 'lodash';

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    };
  }

  componentDidMount() {
    this.setState({
      date: this.props.date,
    });
  }

  getDayOfStartWeek = day => {
    let dayOfStartWeek = day;
    if (dayOfStartWeek === 0) dayOfStartWeek = 7;
    return dayOfStartWeek;
  };

  createMonth = () => {
    const {date, daysInMonth} = this.state;

    const monthNumber = date && date.getMonth();
    const year = date && date.getFullYear();
    const month = date && date.getMonth();
    let days = date && daysInMonth[month];
    if (this.isLeapYear(year) && month === 1) days = 29;
    let ViewDays = [];
    const dayOfStartWeek = this.getDayOfStartWeek(date && date.getDay());
    for (let i = 1; i < dayOfStartWeek; i++) {
      ViewDays.push('.');
    }

    for (let i = 1; i <= days; i++) {
      ViewDays.push(i);
    }

    const createArrayOfWeeks = ViewDays.map((i, index) => {
      let workWeek = [];
      const day = isNumber(i) ? i : null;
      const currentDay = new Date(year, monthNumber, day);
      if (index === 0) {
        workWeek = ViewDays.slice(index, index + 7);
        return this.createWeek(workWeek);
      }
      if (currentDay.getDay() === 1) {
        workWeek = ViewDays.slice(index, index + 7);
        return this.createWeek(workWeek);
      }
    });

    return createArrayOfWeeks;
  };

  createWeek = week => {
    const newWeek = week.map((i, index) => {
      return <Day key={index} style={'noMarkedSmall'} date={i} />;
    });
    return <View style={styles.weekWrap}>{newWeek}</View>;
  };

  isLeapYear = year => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? true : false;
  };

  render() {
    return (
      <ScrollView style={styles.monthWrap}>{this.createMonth()}</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  weekWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  monthWrap: {
    flex: 1,
    flexDirection: 'column',
  },
});
