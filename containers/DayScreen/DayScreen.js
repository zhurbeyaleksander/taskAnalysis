import React, {Component} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {
  getData,
  resetProps,
  getTaskList,
  addCheck,
} from '../../store/branches/dataBranch';
import {
  setCurrentMonth,
  setCurrentDay,
  resetCurrentMonth,
} from '../../store/branches/setDateBranch';
import {TaskProgressTable} from '../../components/TaskProgressTable';
import {Spinner} from '../../components/Spinner';
import {Button} from '../../components/Button';

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
    const date = new Date();
    const dataForMonthComponent = new Date(date.getFullYear(), date.getMonth(), 1);
    this.props.actions.getData('day', date);
    this.props.actions.getTaskList(date);
    this.props.actions.setCurrentMonth(dataForMonthComponent);
    this.props.actions.setCurrentDay(date);
  }

  componentDidUpdate(prevProps) {
    const {currentDay} = this.props;
    if (this.props.currentDay !== prevProps.currentDay) {
      const date = currentDay;
      this.props.actions.getData('day', date);
      this.props.actions.getTaskList(date);
    }

    if (this.props.needReload) {
      this.props.actions.getTaskList(currentDay);
      this.props.actions.getData('day', currentDay);
    }
  }

  componentWillUnmount() {
    this.props.actions.resetProps();
  }

  renderContent = () => {
    const {monthTitle} = this.state;
    const {currentDay} = this.props;
    const day = moment(currentDay).date();
    const currentMonth = moment(currentDay).month();
    return (
      <View style={styles.dayMonth}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{monthTitle[currentMonth]}</Text>
      </View>
    );
  };

  taskList = taskList => {
    if (taskList && taskList.length) {
      const listView = taskList.map(i => {
        let done = 0;
        const {currentDay} = this.props;
        const allChecks = Object.keys(i.checks);
        allChecks.forEach(i => {
          if (moment(currentDay).format('YYYY-MM-DD') === moment(i).format('YYYY-MM-DD')) {
            done += 1;
          }
        });
        return (
          <View style={styles.taskList} key={i.taskTitle}>
            <View style={styles.taskTitle}>
              <Text style={styles.taskListText}>{i.taskTitle}</Text>
              <Text style={styles.taskListText}>
                ({done} /{i.repeat})
              </Text>
            </View>
            <View style={styles.checkButton}>
              <Button onPress={() => this.onPressCheck(i.taskTitle)}>
                Отметить
              </Button>
            </View>
          </View>
        );
      });
      return listView;
    } else {
      return <Text>Список задач пуст</Text>;
    }
  };

  onPressAddButton = () => {
    this.props.navigation.navigate('AddTask');
  };

  onPressCheck = taskTitle => {
    const date = new Date();
    this.props.actions.addCheck(taskTitle, date);
  };

  render() {
    const {isLoadingData, data, taskListIndate} = this.props;
    return (
      <ScrollView style={styles.wrapDay}>
        {this.renderContent()}
        <View style={styles.taskProgress}>
          {isLoadingData ? <Spinner /> : <TaskProgressTable data={data} />}
        </View>
        <ScrollView style={styles.taskListWrap}>
          {this.taskList(taskListIndate)}
        </ScrollView>
        <View style={styles.buttonArea}>
          <Button onPress={this.onPressAddButton}>Добавить</Button>
        </View>
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
    needReload: state.taskProgressReducer.needReload,
    currentDay: state.setDateReducer.currentDay,
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
      addCheck: (key, date) => {
        dispatch(addCheck(key, date));
      },
      setCurrentMonth: month => {
        dispatch(setCurrentMonth(month));
      },
      setCurrentDay: day => {
        dispatch(setCurrentDay(day));
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
  taskListWrap: {
    margin: 15,
  },
  taskList: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  taskListText: {
    fontSize: 20,
  },
  taskTitle: {
    flex: 2,
  },
  checkButton: {
    flex: 1,
  },
  buttonArea: {
    flex: 1,
    margin: 15,
  },
});

export const DayScreen = connect(mapStateToProps, mapDispatchToProps)(DayScreenClass);
