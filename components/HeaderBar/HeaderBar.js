import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HeaderBar extends Component {
  render() {
    const {title} = this.props;
    return (
      <View style={styles.headerBarContent}>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  headerBarContent: {
    flex: 1,
    alignItems: 'center',
  },
});
