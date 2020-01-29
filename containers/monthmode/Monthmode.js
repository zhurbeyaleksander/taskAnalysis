import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from '../../components/Button/index';
import {Spinner} from '../../components/Spinner/index';
import {Day} from '../../components/Day/index';
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
        <View style={styles.cal}>
          <Day date={23} style={'noResultSmall'} />
          <Day date={24} style={'allDoneSmall'} />
          <Day date={25} style={'partResultSmall'} />
          <Day date={26} style={'noResultSmall'} />
          <Day date={27} style={'partResultSmall'} />
          <Day date={28} style={'allDoneSmall'} />
          <Day date={29} style={'allDoneSmall'} />
        </View>
        <View style={styles.cal2}>
          <Day date={1} style={'partResultSmall'} />
          <Day date={2} style={'noResultSmall'} />
          <Day date={3} style={'partResultSmall'} />
          <Day date={4} style={'noResultSmall'} />
          <Day date={5} style={'noMarkedSmall'} />
          <Day date={6} style={'noMarkedSmall'} />
          <Day date={7} style={'noMarkedSmall'} />
        </View>
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

export const MonthScreen = connect(mapStateToProps)(Monthmode);
