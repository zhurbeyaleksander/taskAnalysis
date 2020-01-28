import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default class Button extends Component {
  render() {
    const {style, children, onPress} = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    backgroundColor: '#B0C4DE',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 18,
  },
});
