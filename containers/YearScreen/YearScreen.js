import React, {Component} from 'react';
import {Month} from '../../components/Month/index';
import {connect} from 'react-redux';

class Year extends Component {
  render() {
    return <Month />;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.tasksReducer.isLoading,
  };
};

export const YearScreen = connect(mapStateToProps)(Year);
