/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerStyle, scrollContainer} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {
  ExerciseDetailRouteProp,
  TodayExerciseDataProps,
} from '../../services/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseDetail = () => {
  const route = useRoute<ExerciseDetailRouteProp>();
  const {index} = route.params;
  const [exercise, setExercise] = useState<TodayExerciseDataProps>({
    title: '',
    repeat: '',
    level: '',
    time: '',
    notify: false,
    img: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await AsyncStorage.getItem('todayExercise');
      if (res) {
        const data: TodayExerciseDataProps[] = JSON.parse(res);
        setExercise(data[index]);
      }
    };
    fetchData();
  }, [index]);


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
