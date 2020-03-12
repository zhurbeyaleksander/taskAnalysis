import React, {Component} from 'react';
import {Month} from '../../components/Month/index';
import {connect} from 'react-redux';
import {ScrollView, View, TouchableOpacity, StyleSheet} from 'react-native';
import {ETypeMonth} from '../../models/appModels';
import {Button} from '../../components/Button/index';
import {getData} from '../../store/dataBranch';

class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
    };
  }

  componentDidMount() {
    const year = new Date().getFullYear();
    this.setState({year: year}, () => {
      this.props.actions.getData('year', this.state.year);
    });
  }

  onPress(date) {
    this.props.navigation.navigate('Month', {
      date: date,
      onPress: this.onPressFromMonthComponent,
    });
  }

  onPressFromMonthComponent = data => {
    this.props.navigation.navigate('Day', {data: data});
  };

  onPressAddButton = () => {
    this.props.navigation.navigate('AddTask');
  };

  renderMonths = () => {
    let rowArrayOfMonth = [];
    let firstMonthNumberInRow = 0;
    let secondMonthNumberInRow = 1;
    let thirdMonthNumberInRow = 2;

    for (var i = 0; i < 4; i++) {
      const rowOfMonth = this.createRowOfMonth([
        firstMonthNumberInRow,
        secondMonthNumberInRow,
        thirdMonthNumberInRow,
      ]);

      rowArrayOfMonth.push(rowOfMonth);
      firstMonthNumberInRow += 3;
      secondMonthNumberInRow += 3;
      thirdMonthNumberInRow += 3;
    }

    return rowArrayOfMonth;
  };

  createRowOfMonth = monthNumbers => {
    const {year} = this.state;
    const RowOfMonth = monthNumbers.map((monthNumber, index) => {
      const date = new Date(year, monthNumber, 1);
      return (
        <TouchableOpacity onPress={() => this.onPress(date)}>
          <Month
            date={date}
            mode={ETypeMonth.SMALL}
            onPress={this.onPressFromMonthComponent}
          />
        </TouchableOpacity>
      );
    });

    return <View style={styles.threeMonths}>{RowOfMonth}</View>;
  };

  render() {
    const {isLoadingData} = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.year}>
          <ScrollView>{this.renderMonths()}</ScrollView>
        </View>
        <View style={styles.buttonArea}>
          <Button onPress={this.onPressAddButton}>Добавить</Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
    data: state.taskProgressReducer.data,
    isLoadingData: state.taskProgressReducer.isLoadingData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getData: (period, data) => {
        dispatch(getData(period, data));
      },
    },
  };
};

const styles = StyleSheet.create({
  year: {
    flex: 9,
    margin: 15,
  },
  content: {
    flex: 1,
  },
  buttonArea: {
    flex: 1,
    margin: 15,
  },
  threeMonths: {
    flex: 1,
    flexDirection: 'row',
  },
});

export const YearScreen = connect(mapStateToProps, mapDispatchToProps)(Year);
