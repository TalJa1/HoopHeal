/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle, scrollContainer} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';

const AddSchedule = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <Text>AddSchedule</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddSchedule;

const styles = StyleSheet.create({
  container: containerStyle,
});
