import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from '../../components/Button/index';
import {Spinner} from '../../components/Spinner/index';
import {dispatchStore} from '../../utils/StoreUtils';
import {connect} from 'react-redux';

class Monthmode extends Component {
  render() {
    return (
      <View>
        <Text>Режим месяца</Text>
        <Button onPress={() => this.props.navigation.navigate('Week')}>
          Неделя
        </Button>
        <Button onPress={() => dispatchStore('setData', 'name', 'Sasha')}>
          Задать имя
        </Button>
        <Button onPress={() => dispatchStore('getData', 'name')}>
          Посмотреть имя
        </Button>
        <Spinner />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

export const MonthScreen = connect(mapStateToProps)(Monthmode);
