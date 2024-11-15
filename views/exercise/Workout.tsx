/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle, scrollContainer} from '../../services/styleProps';
import {WorkoutDetailRouteProp} from '../../services/typeProps';
import {useRoute} from '@react-navigation/native';

const Workout = () => {
  const route = useRoute<WorkoutDetailRouteProp>();
  const {selectedIndex} = route.params;

  console.log('selectedIndex', selectedIndex);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
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
