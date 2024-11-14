/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  containerStyle,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {notiIcon} from '../../assets/svgIcon';
import {TodayExerciseDataProps} from '../../services/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodayExerciseData} from '../../services/renderData';

const Exercise = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={scrollContainer}>
        <View style={{flex: 1}}>
          <Header />
          <TodayExercise />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TodayExercise: React.FC = () => {
  const [todayExer, setTodayExer] = useState<TodayExerciseDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await AsyncStorage.getItem('todayExercise');
      if (res) {
        const parsedData: TodayExerciseDataProps[] = JSON.parse(res);
        setTodayExer(parsedData);
      } else {
        setTodayExer(TodayExerciseData);
        await AsyncStorage.setItem(
          'todayExercise',
          JSON.stringify(TodayExerciseData),
        );
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.todayExer}>
      <View style={styles.todayTitleGrp}>
        <Text style={styles.todayTitle}>Today's Exercise</Text>
        <Text style={styles.more}>More</Text>
      </View>
      <View>
        {todayExer.map((item, index) => {
          return (
            <View key={index}>
              <Text>{item.title}</Text>
              <Text>{item.level}</Text>
            </View>
          );
        })}
      </View>
    </View>
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

  todayTitleGrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayTitle: {
    color: '#F87643',
    fontSize: 20,
    fontWeight: '900',
  },
  more: {
    color: '#8F8F8F',
    fontSize: 12,
    fontWeight: '500',
  },
  todayExer: {
    paddingHorizontal: vw(5),
    marginTop: vh(2),
  },
});
