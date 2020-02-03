import React, {Component} from 'react';
import {Month} from '../../components/Month/index';
import {connect} from 'react-redux';

class Year extends Component {
  render() {
    const date = new Date(2020, 1, 1);
    const date2 = new Date(2020, 2, 1);
    return [<Month date={date} />, <Month date={date2} />];
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};


export const YearScreen = connect(mapStateToProps)(Year);
