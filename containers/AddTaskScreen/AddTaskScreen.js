import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button} from '../../components/Button';
import {SwitchButton} from '../../components/Button';
import {set, cloneDeep} from 'lodash';
import {dispatchStore} from '../../utils/StoreUtils';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: null,
      daysToDo: {
        m: 0,
        t: 0,
        w: 0,
        th: 0,
        f: 0,
        sa: 0,
        su: 0,
      },
      weekDaysSwitch: 0,
      weekendSwitch: 0,
      repeat: 1,
    };
  }

  pressOnDayButton = name => e => {
    const {daysToDo} = this.state;
    const arrayForCheck = Object.keys(daysToDo);
    const newState = cloneDeep(this.state);
    let key;
    if (arrayForCheck.some(el => el === name)) {
      set(newState, `daysToDo.${name}`, e === 1 ? 0 : 1);
      set(newState, 'weekDaysSwitch', 0);
      set(newState, 'weekendSwitch', 0);
    }

    if (name === 'weekDays') {
      for (key in daysToDo) {
        if (key !== 'sa' && key !== 'su') {
          set(newState, `daysToDo.${key}`, e === 1 ? 0 : 1);
        }
      }
      set(newState, 'daysToDo.sa', 0);
      set(newState, 'daysToDo.su', 0);
      set(newState, 'weekendSwitch', 0);
      set(newState, 'weekDaysSwitch', e === 1 ? 0 : 1);
    }

    if (name === 'weekend') {
      for (key in daysToDo) {
        if (key !== 'sa' && key !== 'su') {
          set(newState, `daysToDo.${key}`, 0);
        }
      }
      set(newState, 'weekDaysSwitch', 0);
      set(newState, 'daysToDo.sa', e === 1 ? 0 : 1);
      set(newState, 'daysToDo.su', e === 1 ? 0 : 1);
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
          isActive={daysToDo.m}>
          ПН
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('t')}
          isActive={daysToDo.t}>
          ВТ
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('w')}
          isActive={daysToDo.w}>
          СР
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('th')}
          isActive={daysToDo.th}>
          ЧТ
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('f')}
          isActive={daysToDo.f}>
          ПТ
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('sa')}
          isActive={daysToDo.sa}>
          СБ
        </SwitchButton>
        <SwitchButton
          onPress={this.pressOnDayButton('su')}
          isActive={daysToDo.su}>
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

  addTask = () => {
    const {taskTitle, daysToDo, repeat} = this.state;
    const data = {
      taskTitle: taskTitle,
      daysToDo: daysToDo,
      repeat: repeat,
    };

    dispatchStore('setData', taskTitle, data);
  };

  render() {
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
            <Button onPress={this.addTask}>Добавить</Button>
          </View>
        </View>
      </ScrollView>
    );
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

export const AddTaskScreen = AddTask;
