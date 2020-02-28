import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {get} from 'lodash';

export default class SwitchButton extends Component {
  render() {
    const {children, onPress, isActive} = this.props;
    const buttonStyle = isActive
      ? get(styles, 'buttonActive')
      : get(styles, 'button');
    const textStyle = isActive
      ? get(styles, 'textActive')
      : get(styles, 'text');

    return (
      <TouchableOpacity onPress={() => onPress(isActive)} style={buttonStyle}>
        <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: '#B0C4DE',
    padding: 10,
    alignItems: 'center',
    marginRight: 2,
  },
  buttonActive: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: '#4B0082',
    padding: 10,
    alignItems: 'center',
    marginRight: 2,
  },
  text: {
    fontSize: 18,
    color: '#000000',
  },
  textActive: {
    fontSize: 18,
    color: '#DAA520',
  },
});
