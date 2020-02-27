import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Button} from '../../components/Button';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: null,
    };
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.taskTitle}>
          <Text style={styles.textTaskTitle}>Заголовок задачи</Text>
          <TextInput style={styles.textInput} />
        </View>
        <View style={styles.weekDays}>
          <Text>Дни недели:</Text>
        </View>
        <View style={styles.addButton}>
          <Button>Добавить</Button>
        </View>
      </View>
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
  },
  weekDays: {
    flex: 3,
    margin: 15,
    backgroundColor: '#ffffff',
  },
  addButton: {
    flex: 1,
    margin: 15,
  },
});

export const AddTaskScreen = AddTask;
