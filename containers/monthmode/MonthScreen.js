import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Month} from '../../components/Month/index';
import {ETypeMonth} from '../../models/appModels';

class MonthScreenClass extends Component {
  render() {
    const {date} = this.props.route.params;
    return <Month date={date} mode={ETypeMonth.BIG} />;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

const styles = StyleSheet.create({
  cal: {
    flex: 1,
    flexDirection: 'row',
  },
  cal2: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
  },
});

export const MonthScreen = connect(mapStateToProps)(MonthScreenClass);
