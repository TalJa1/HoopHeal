/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle, scrollContainer} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';

const Exercise = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={scrollContainer}>
        <View style={{flex: 1}}>
          <Text>Exercise</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: containerStyle,
});
