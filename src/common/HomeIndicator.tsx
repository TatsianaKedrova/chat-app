import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const HomeIndicator = () => {
  return (
    <View style={styles.homeIndicator}>
      <Image source={require('../assets/homeIndicator.png')}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  homeIndicator: {
    position: 'absolute',
    width: 375,
    height: 34,
    left: 1,
    right: -1,
    bottom: 0,
  },
});

export default HomeIndicator;
