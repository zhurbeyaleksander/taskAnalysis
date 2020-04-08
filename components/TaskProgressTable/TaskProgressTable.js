import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TaskProgressTable extends Component {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.progressTableStyle}>
        <View style={styles.text}>
          <Text style={styles.labelStyle}>Задач</Text>
          <Text style={styles.data}>{data.totalTask}</Text>
          <Text style={styles.labelStyle}>Сделать</Text>
          <Text style={styles.data}>{data.totalRepeat}</Text>
          <Text style={styles.labelStyle}>Сделано</Text>
          <Text style={styles.data}>{data.totalToDo}</Text>
          <Text style={styles.percent}>{data.percent} %</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  progressTableStyle: {
    backgroundColor: '#cccccc',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  data: {
    marginLeft: 15,
    paddingTop: 5,
  },
  labelStyle: {
    marginLeft: 25,
    paddingTop: 5,
    color: '#002F55',
  },
  percent: {
    backgroundColor: '#B0C4DE',
    padding: 5,
    borderRadius: 8,
    marginLeft: 12,
  },
});
