import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

class DayScreenClass extends Component {
  render() {
    return <Text>День</Text>;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

export const DayScreen = connect(mapStateToProps)(DayScreenClass);
