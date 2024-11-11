import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {centerAll, containerStyle, text1, vh, vw} from '../services/styleProps';

const LoadingView = () => {
  return (
    <View style={[styles.container, centerAll, {rowGap: vh(2)}]}>
      <Image
        style={styles.logo}
        source={require('../assets/loading/Logo.png')}
      />
      <Text style={text1}>“From hoops to healing, back to winning”</Text>
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: containerStyle,
  logo: {
    width: vw(90),
    height: vw(90),
    resizeMode: 'contain',
  },
});
