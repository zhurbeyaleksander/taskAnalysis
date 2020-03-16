import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {getData, resetProps, getTaskList} from '../../store/dataBranch';
import {TaskProgressTable} from '../../components/TaskProgressTable';
import {Spinner} from '../../components/Spinner';

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
    this.setState({date: data.currentDate}, () => {
      this.props.actions.getData('day', this.state.date);
      this.props.actions.getTaskList(this.state.date);
    });
  }

  componentWillUnmount() {
    this.props.actions.resetProps();
  }

  renderContent = () => {
    const {date, monthTitle} = this.state;
    const currentDay = moment(date).date();
    const currentMonth = moment(date).month();
    return (
      <View style={styles.dayMonth}>
        <Text style={styles.day}>{currentDay}</Text>
        <Text style={styles.month}>{monthTitle[currentMonth]}</Text>
      </View>
    );
  };

  statisticPanel = () => {
    return <Text>Выполнено Не выполнено Всего</Text>;
  };

  taskList = taskList => {
    if (taskList.length) {
      return <Text>Задачи</Text>;
    } else {
      return <Text>Список задач пуст</Text>;
    }
  };

  render() {
    const {isLoadingData, data, taskListIndate} = this.props;
    const taskList = [];
    return (
      <ScrollView style={styles.wrapDay}>
        {this.renderContent()}
        <View style={styles.taskProgress}>
          {isLoadingData ? <Spinner /> : <TaskProgressTable data={data} />}
        </View>
        <View>{this.taskList(taskList)}</View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
    data: state.taskProgressReducer.data,
    isLoadingData: state.taskProgressReducer.isLoadingData,
    isLoadingTaskListInDate: state.taskProgressReducer.taskProgressReducer,
    taskListIndate: state.taskProgressReducer.taskListIndate,
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
      getTaskList: day => {
        dispatch(getTaskList(day));
      },
    },
  };
};

const styles = StyleSheet.create({
  wrapDay: {
    flex: 1,
    flexDirection: 'column',
  },
  dayMonth: {
    flex: 1,
  },
  day: {
    fontSize: 100,
    textAlign: 'center',
  },
  month: {
    fontSize: 80,
    textAlign: 'center',
  },
  taskProgress: {
    margin: 15,
  },
});

export const DayScreen = connect(mapStateToProps, mapDispatchToProps)(DayScreenClass);
