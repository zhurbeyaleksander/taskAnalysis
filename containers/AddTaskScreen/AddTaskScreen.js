import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Button} from '../../components/Button';
import {SwitchButton} from '../../components/Button';
import {set, cloneDeep} from 'lodash';

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
    };
  }

  pressOnDayButton = name => e => {
    const {daysToDo} = this.state;
    const arrayForCheck = Object.keys(daysToDo);
    const newState = cloneDeep(this.state);
    if (arrayForCheck.some(el => el === name)) {
      set(newState, `daysToDo.${name}`, e === 1 ? 0 : 1);
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
    return (
      <View style={styles.weekDaysSwitchButtons}>
        <SwitchButton isActive={0}>Только будни</SwitchButton>
      </View>
    );
  };

  renderWeekEndButton = () => {
    return (
      <View style={styles.weekDaysSwitchButtons}>
        <SwitchButton isActive={0}>Только выходные</SwitchButton>
      </View>
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.taskTitle}>
            <Text style={styles.textTaskTitle}>Заголовок задачи</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.weekDays}>
            <Text style={styles.textTaskTitle}>Дни недели</Text>
            {this.renderWeekDaysButtons()}
            {this.renderOnlyWeekDaysButton()}
            {this.renderWeekEndButton()}
          </View>
          <View style={styles.addButton}>
            <Button>Добавить</Button>
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
  addButton: {
    flex: 1,
    margin: 15,
  },
});

export const AddTaskScreen = AddTask;
