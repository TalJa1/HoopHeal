/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  containerStyle,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {notiIcon} from '../../assets/svgIcon';

const Exercise = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={scrollContainer}>
        <View style={{flex: 1}}>
          <Header />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerExer}>Exercise</Text>
      {notiIcon(vw(7), vw(7), '#F87643')}
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: containerStyle,
  header: {
    paddingHorizontal: vw(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vh(2),
    alignItems: 'center',
  },
  headerExer: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'RacingSansOne-Regular',
  },
});
