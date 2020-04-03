import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Month} from '../../components/Month/index';
import {ETypeMonth} from '../../models/appModels';
import {
  getData,
  needReloadTasksList,
  resetProps,
} from '../../store/branches/dataBranch';
import {TaskProgressTable} from '../../components/TaskProgressTable';
import {Spinner} from '../../components/Spinner';
import {setCurrentDay} from '../../store/branches/setDateBranch';

class MonthScreenClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }
  componentDidMount() {
    const {currentMonth} = this.props;
    const dateForMonthComponent = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const date = this.props.route.params
      ? this.props.route.params.date
      : dateForMonthComponent;
    this.setState({
      date: date,
    });
    this.props.actions.getData('month', date);
  }

  componentDidUpdate(prevProps) {
    const {currentMonth} = this.props;
    if (this.props.data === prevProps.data) {
      this.props.actions.getData('month', currentMonth);
    }
  }

  componentWillUnmount() {
    this.props.actions.resetProps();
  }

  onPressDay = data => {
    this.props.actions.setCurrentDay(data.currentDate);
    this.props.actions.needReloadTasksList();
    this.props.navigation.navigate('Day', {data: data});
  };

  render() {
    const {data, isLoadingData, currentMonth} = this.props;
    return (
      <View style={styles.wrapMonth}>
        {isLoadingData ? <Spinner /> : <TaskProgressTable data={data} />}
        <ScrollView>
          <Month date={currentMonth} mode={ETypeMonth.BIG} onPress={this.onPressDay} /></ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
    data: state.taskProgressReducer.data,
    isLoadingData: state.taskProgressReducer.isLoadingData,
    currentMonth: state.setDateReducer.currentMonth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getData: (period, data) => {
        dispatch(getData(period, data));
      },
      setCurrentDay: day => {
        dispatch(setCurrentDay(day));
      },
      needReloadTasksList: () => {
        dispatch(needReloadTasksList());
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
