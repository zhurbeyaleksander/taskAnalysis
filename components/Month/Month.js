import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Day} from '../../components/Day/index';

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
    const days = date && daysInMonth[date.getMonth()];
    let ViewDays = [];
    const dayOfStartWeek = this.getDayOfStartWeek(date && date.getDay());
    for (let i = 1; i < dayOfStartWeek; i++) {
      ViewDays.push('.');
    }
    for (let i = 0; i < days; i++) {
      ViewDays.push(i);
    }

    const ShowDays = ViewDays.map(i => {
      return <Day date={i + 1} />;
    });

    return <View>{ShowDays}</View>;
  };

  render() {
    return (<View>
      {this.createMonth()}
    </View>);
  }
}

const styles = StyleSheet.create({
  monthWrap: {
    flex: 1,
  },
});
