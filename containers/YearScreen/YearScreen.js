import React, {Component} from 'react';
import {Month} from '../../components/Month/index';
import {connect} from 'react-redux';

class Year extends Component {
  render() {
    const date = new Date(2020, 0, 1);
    return <Month date={date} />;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

export const YearScreen = connect(mapStateToProps)(Year);
