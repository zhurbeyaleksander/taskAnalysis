import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Month} from '../../components/Month/index';
import {ETypeMonth} from '../../models/appModels';
import {getData, resetProps} from '../../store/dataBranch';

class MonthScreenClass extends Component {
  componentDidMount() {
    const {date} = this.props.route.params;
    this.props.actions.getData('month', date);
  }

  componentWillUnmount() {
    this.props.actions.resetProps();
  }

  render() {
    const {date, onPress} = this.props.route.params;
    return <Month date={date} mode={ETypeMonth.BIG} onPress={onPress}/>;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getData: (period, data) => {
        dispatch(getData(period, data));
      },
      resetProps: () => {
        dispatch(resetProps());
      },
    },
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

export const MonthScreen = connect(mapStateToProps, mapDispatchToProps)(MonthScreenClass);
