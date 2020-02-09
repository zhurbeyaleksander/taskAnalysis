import React, {Component} from 'react';
import {Month} from '../../components/Month/index';
import {connect} from 'react-redux';
import {ScrollView, View, StyleSheet} from 'react-native';

class Year extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
    };
  }

  componentDidMount() {
    const year = new Date().getFullYear();
    this.setState({
      year: year,
    });
  }

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
      return <Month date={date} mode={'small'} />;
    });

    return <View style={styles.threeMonths}>{RowOfMonth}</View>;
  };

  render() {
    return (
      <ScrollView style={styles.year}>{this.renderMonths()}</ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

const styles = StyleSheet.create({
  year: {
    flex: 1,
    flexDirection: 'column',
  },
  threeMonths: {
    flex: 1,
    flexDirection: 'row',
  },
});
export const YearScreen = connect(mapStateToProps)(Year);
