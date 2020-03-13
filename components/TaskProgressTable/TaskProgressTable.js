import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TaskProgressTable extends Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.progressTableStyle}>
        <Text style={styles.text}>
          <Text style={styles.rowElement}>Задач {data.totalTask} </Text>
          <Text style={styles.rowElement}>Сделать {data.totalRepeat} </Text>
          <Text style={styles.rowElement}>Сделано {data.totalToDo} </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressTableStyle: {
    backgroundColor: '#ffffff',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
  },
  rowElement: {
    marginLeft: 25,
  },
});
