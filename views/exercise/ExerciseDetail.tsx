/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  containerStyle,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ExerciseDetailRouteProp,
  TodayExerciseDataProps,
} from '../../services/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backArrowIcon} from '../../assets/svgIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

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
          <Header />
          <View>
            <Text style={styles.title}>{exercise.title}</Text>
            <Text style={styles.repeat}>6 | {exercise.repeat}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerback}
        onPress={() => navigation.goBack()}>
        {backArrowIcon(vw(7), vw(7), '#000000')}
      </TouchableOpacity>
      <Image
        style={styles.headerimg}
        source={require('../../assets/exercise/hc.png')}
      />
    </View>
  );
};

export default ExerciseDetail;

const styles = StyleSheet.create({
  container: containerStyle,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(5),
    marginVertical: vh(2),
  },
  headerback: {
    padding: vw(2),
    backgroundColor: '#6262624D',
    borderRadius: vw(50),
  },
  headerimg: {
    width: vw(11),
    height: vw(11),
  },
  title: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'RacingSansOne-Regular',
  },
  repeat: {
    color: '#7B6F72',
    fontSize: 12,
    textAlign: 'center',
  },
});
