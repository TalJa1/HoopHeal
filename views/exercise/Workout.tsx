/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle, scrollContainer} from '../../services/styleProps';

const Workout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <Text>Workout</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: containerStyle,
});
