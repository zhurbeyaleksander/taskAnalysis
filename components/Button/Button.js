import React, {PureComponent} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default class Button extends PureComponent {
  render() {
    const {style, children, onPress} = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Text>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: '#0094EA',
    padding: 10,
    alignItems: 'center',
    color: '#FFFFFF',
  },
});
