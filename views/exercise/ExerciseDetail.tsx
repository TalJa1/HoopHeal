/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle, scrollContainer} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';

const ExerciseDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <Text>ExerciseDetail</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseDetail;

const styles = StyleSheet.create({
  container: containerStyle,
});
