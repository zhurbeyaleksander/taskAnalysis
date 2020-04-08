import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default class HeaderBar extends Component {
  render() {
    return (
      <View>
        <Image
          style={styles.manageIcon}
          source={require('../../assets/img/manage_.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  manageIcon: {
    marginRight: 20,
  },
});
