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
} from '../../store/dataBranch';
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
    const data = this.props.route.params
      ? this.props.route.params.data.currentDate
      : new Date();
    this.setState({date: data}, () => {
      this.props.actions.getData('day', this.state.date);
      this.props.actions.getTaskList(this.state.date);
    });
  }

  componentDidUpdate() {
    if (isEmpty(this.props.data)) {
      const date = this.props.route.params
        ? this.props.route.params.data.currentDate
        : new Date();
      this.props.actions.getData('day', date);
      this.props.actions.getTaskList(date);
    }

    if (this.props.needReload) {
      this.props.actions.getTaskList(this.state.date);
    }
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

  taskList = taskList => {
    if (taskList && taskList.length) {
      const listView = taskList.map(i => {
        let done = 0;
        const {date} = this.state;
        const allChecks = Object.keys(i.checks);
        allChecks.forEach(i => {
          if (moment(date).format('YYYY-MM-DD') === moment(i).format('YYYY-MM-DD')) {
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
