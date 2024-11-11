/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle, vh, vw} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {signInStarIcon} from '../../assets/svgIcon';

const SignIn2 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Header />
          <Text>SignIn2</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerhorizontal}>
        <Image source={require('../../assets/login/logo.png')} />
        {signInStarIcon(vw(10), vw(10))}
      </View>
      <View style={styles.welcomeGrp}>
        <Text style={styles.welcome}>Welcome</Text>
        <Image source={require('../../assets/login/waving.png')} />
      </View>
    </View>
  );
};

export default SignIn2;

const styles = StyleSheet.create({
  container: containerStyle,
  header: {
    paddingHorizontal: vw(5),
    paddingVertical: vh(2),
  },
  headerhorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(3),
    columnGap: vw(5),
  },
  welcome: {
    fontSize: 28,
    fontWeight: '700',
    color: '#BABABA',
  },
});
