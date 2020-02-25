import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';

class DayScreenClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      monthTitle: [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
      ],
    };
  }

  componentDidMount() {
    const data = this.props.route.params.data;
    this.setState({
      date: data.currentDate,
    });
  }

  render() {
    const {date} = this.state;
    return <Text>День</Text>;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

export const DayScreen = connect(mapStateToProps)(DayScreenClass);
