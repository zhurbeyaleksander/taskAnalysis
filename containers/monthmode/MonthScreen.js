import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from '../../components/Button/index';
import {Spinner} from '../../components/Spinner/index';
import {Day} from '../../components/Day/index';
import {dispatchStore} from '../../utils/StoreUtils';
import {connect} from 'react-redux';

class MonthScreenClass extends Component {
  render() {
    return (
      <View>
        <Text>Режим месяца</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

const styles = StyleSheet.create({
  cal: {
    flex: 1,
    flexDirection: 'row',
  },
  cal2: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
  },
});

export const MonthScreen = connect(mapStateToProps)(MonthScreenClass);
