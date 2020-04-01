import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button} from '../../components/Button';
import {SwitchButton} from '../../components/Button';
import {set, cloneDeep} from 'lodash';
import {
  getTask,
  editTask,
  resetProps,
} from '../../store/branches/manageTasksBranch';

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: null,
      daysToDo: {
        m: {toDo: 0, dayNumber: 1},
        t: {toDo: 0, dayNumber: 2},
        w: {toDo: 0, dayNumber: 3},
        th: {toDo: 0, dayNumber: 4},
        f: {toDo: 0, dayNumber: 5},
        sa: {toDo: 0, dayNumber: 6},
        su: {toDo: 0, dayNumber: 0},
      },
      weekDaysSwitch: 0,
      weekendSwitch: 0,
      repeat: 1,
    };
  }

  componentDidMount() {
    this.props.actions.getTask(this.props.route.params.key);
  }

  componentDidUpdate(prevProps) {
    const {editTask} = this.props;
    if (this.props.editTask !== prevProps.editTask) {
      this.setState({
        taskTitle: editTask['taskTitle'],
        daysToDo: editTask.daysToDo,
        repeat: editTask.repeat,
        weekDaysSwitch: editTask.weekDaysSwitch,
        weekendSwitch: editTask.weekendSwitch,
      });
    }
  }

  componentWillUnmount() {
    this.props.actions.resetProps();
  }

  pressOnDayButton = name => e => {
    const {daysToDo} = this.state;
    const arrayForCheck = Object.keys(daysToDo);
    const newState = cloneDeep(this.state);
    let key;
    if (arrayForCheck.some(el => el === name)) {
      set(newState, `daysToDo.${name}.toDo`, e === 1 ? 0 : 1);
      set(newState, 'weekDaysSwitch', 0);
      set(newState, 'weekendSwitch', 0);
    }

    if (name === 'weekDays') {
      for (key in daysToDo) {
        if (key !== 'sa' && key !== 'su') {
          set(newState, `daysToDo.${key}.toDo`, e === 1 ? 0 : 1);
        }
      }
      set(newState, 'daysToDo.sa.toDo', 0);
      set(newState, 'daysToDo.su.toDo', 0);
      set(newState, 'weekendSwitch', 0);
      set(newState, 'weekDaysSwitch', e === 1 ? 0 : 1);
    }

    if (name === 'weekend') {
      for (key in daysToDo) {
        if (key !== 'sa' && key !== 'su') {
          set(newState, `daysToDo.${key}.toDo`, 0);
        }
      }
      set(newState, 'weekDaysSwitch', 0);
      set(newState, 'daysToDo.sa.toDo', e === 1 ? 0 : 1);
      set(newState, 'daysToDo.su.toDo', e === 1 ? 0 : 1);
      set(newState, 'weekendSwitch', e === 1 ? 0 : 1);
    }

    this.setState(newState);
  };

  renderWeekDaysButtons = () => {
    const {daysToDo} = this.state;

    return (
      <View style={styles.weekDaysSwitchButtons}>
        <SwitchButton
          onPress={this.pressOnDayButton('m')}
          isActive={daysToDo.m.toDo}>
          ПН
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('t')}
          isActive={daysToDo.t.toDo}>
          ВТ
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('w')}
          isActive={daysToDo.w.toDo}>
          СР
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('th')}
          isActive={daysToDo.th.toDo}>
          ЧТ
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('f')}
          isActive={daysToDo.f.toDo}>
          ПТ
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('sa')}
          isActive={daysToDo.sa.toDo}>
          СБ
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('su')}
          isActive={daysToDo.su.toDo}>
          ВС
        </SwitchButton>
      </View>
    );
  };

  renderOnlyWeekDaysButton = () => {
    const {weekDaysSwitch} = this.state;
    return (
      <View style={styles.weekDaysSwitchButtons}>
        <SwitchButton
          isActive={weekDaysSwitch}
          onPress={this.pressOnDayButton('weekDays')}>
          Только будни
        </SwitchButton>
      </View>
    );
  };

  renderweekEndButton = () => {
    const {weekendSwitch} = this.state;

    return (
      <View style={styles.weekDaysSwitchButtons}>
        <SwitchButton
          isActive={weekendSwitch}
          onPress={this.pressOnDayButton('weekend')}>
          Только выходные
        </SwitchButton>
      </View>
    );
  };

  setTitle = () => e => {
    const value = e.nativeEvent.text;

    this.setState({
      taskTitle: value,
    });
  };

  setRepeat = argument => e => {
    const {repeat} = this.state;

    let newValue = argument === 'plus' ? repeat + 1 : repeat - 1;
    if (newValue <= 0) {
      newValue = 1;
    }

    this.setState({
      repeat: newValue,
    });
  };

  editTask = () => {
    const {taskTitle, daysToDo, repeat} = this.state;
    const data = {
      taskTitle: taskTitle,
      daysToDo: daysToDo,
      repeat: repeat,
      checks: {},
    };

    this.props.actions.editTask(data, taskTitle);
  };

  renderMainContent = () => {
    const {taskTitle, repeat} = this.state;

    return (
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.taskTitle}>
            <Text style={styles.textTaskTitle}>Заголовок задачи</Text>
            <TextInput
              style={styles.textInput}
              value={taskTitle}
              onChange={this.setTitle()}
            />
          </View>
          <View style={styles.weekDays}>
            <Text style={styles.textTaskTitle}>Дни недели</Text>
            {this.renderWeekDaysButtons()}
            {this.renderOnlyWeekDaysButton()}
            {this.renderweekEndButton()}
          </View>
          <View style={styles.repeatButtons}>
            <Text style={styles.textTaskTitle}>Количество повторений</Text>
            <View style={styles.repeatButtonRow}>
              <Button
                style={styles.plusAndMinusButton}
                onPress={this.setRepeat('minus')}>
                -
              </Button>
              <Text style={styles.repeatNumber}>{repeat}</Text>
              <Button
                style={styles.plusAndMinusButton}
                onPress={this.setRepeat('plus')}>
                +
              </Button>
            </View>
          </View>
          <View style={styles.addButton}>
            <Button onPress={this.editTask}>Редактировать</Button>
          </View>
        </View>
      </ScrollView>
    );
  };

  successEdit = () => {
    return <Text>Задача успешно отредактированна</Text>;
  };

  render() {
    const {isEdit} = this.props;

    return isEdit ? this.successEdit() : this.renderMainContent();
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  taskTitle: {
    flex: 1,
    margin: 15,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  textTaskTitle: {
    fontSize: 22,
  },
  textInput: {
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    fontSize: 22,
  },
  weekDays: {
    flex: 3,
    margin: 15,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  weekDaysSwitchButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
  },
  repeatButtons: {
    flex: 1,
    margin: 15,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  repeatButtonRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  plusAndMinusButton: {
    width: 40,
    marginRight: 20,
  },
  repeatNumber: {
    width: 30,
    fontSize: 22,
    marginTop: 5,
  },
  addButton: {
    flex: 1,
    margin: 15,
  },
});

const mapStateToProps = state => {
  return {
    editTask: state.manageTaskReducer.editTask,
    isEdit: state.manageTaskReducer.isEdit,
    error: state.manageTaskReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getTask: key => {
        dispatch(getTask(key));
      },
      editTask: (data, key) => {
        dispatch(editTask(data, key));
      },
      resetProps: () => {
        dispatch(resetProps());
      },
    },
  };
};

export const EditTaskScreen = connect(mapStateToProps, mapDispatchToProps)(EditTask);
