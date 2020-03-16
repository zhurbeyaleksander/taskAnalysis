import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Month} from '../../components/Month/index';
import {ETypeMonth} from '../../models/appModels';
import {getData, resetProps} from '../../store/dataBranch';
import {TaskProgressTable} from '../../components/TaskProgressTable';
import {Spinner} from '../../components/Spinner';

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
    const {data, isLoadingData} = this.props;
    return (
      <View style={styles.wrapMonth}>
        {isLoadingData ? <Spinner /> : <TaskProgressTable data={data} />}
        <ScrollView><Month date={date} mode={ETypeMonth.BIG} onPress={onPress} /></ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
    data: state.taskProgressReducer.data,
    isLoadingData: state.taskProgressReducer.isLoadingData,
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
  wrapMonth: {
    flex: 1,
  },
});

export const MonthScreen = connect(mapStateToProps, mapDispatchToProps)(MonthScreenClass);
