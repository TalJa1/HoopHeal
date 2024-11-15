/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle, scrollContainer} from '../../services/styleProps';

const Calendar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <Text>Calendar</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: containerStyle,
});
