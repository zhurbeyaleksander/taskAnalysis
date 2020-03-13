import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {getData, resetProps} from '../../store/dataBranch';

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
      <View>
        <Text>{currentDay}</Text>
        <Text>{monthTitle[currentMonth]}</Text>
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
    const taskList = [];
    return (
      <ScrollView>
        <View>{this.renderContent()}</View>
        <View>{this.statisticPanel()}</View>
        <View>{this.taskList(taskList)}</View>
      </ScrollView>
    );
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

export const DayScreen = connect(mapStateToProps, mapDispatchToProps)(DayScreenClass);
