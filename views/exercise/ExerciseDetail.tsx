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
  rowCenter,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ExerciseDetailRouteProp,
  ExerciseItemProps,
  TodayExerciseDataProps,
} from '../../services/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  backArrowIcon,
  calendarIcon,
  levelIcon,
  nextIcon,
} from '../../assets/svgIcon';
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
    date: '',
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
            <ExerciseItem
              icon={calendarIcon(vw(5), vw(5))}
              label="Calendar"
              renerData={`${exercise.date}, ${exercise.time}`}
            />
            <ExerciseItem
              icon={levelIcon(vw(5), vw(5))}
              label="Level"
              renerData={exercise.level}
            />
          </View>
          <Image
            style={styles.mainImg}
            source={require('../../assets/exercise/exer.png')}
          />
          <SupportItem />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SupportItem: React.FC = () => {
  return (
    <View>
      <View
        style={[
          rowCenter,
          {marginHorizontal: vw(5), justifyContent: 'space-between'},
        ]}>
        <Text style={styles.supportTitle}>Support tool</Text>
        <Text style={styles.supportRightTxt}>(2)</Text>
      </View>
    </View>
  );
};

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  icon,
  label,
  renerData,
}) => {
  return (
    <View style={styles.exerItem}>
      <View style={[rowCenter, styles.exerlabelGrp]}>
        {icon}
        <Text style={{color: '#03020B', fontSize: 14, marginLeft: vw(2)}}>
          {label}
        </Text>
      </View>
      <View style={[rowCenter]}>
        <Text style={styles.exerData}>{renerData}</Text>
        {nextIcon(vw(7), vw(7), 'black')}
      </View>
    </View>
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
  mainImg: {
    width: vw(90),
    height: vh(30),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: vh(2),
  },
  exerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: vw(5),
    marginVertical: vh(1),
    padding: vw(2),
    backgroundColor: '#8F8F8F',
    borderRadius: 12,
  },
  exerlabelGrp: {
    flex: 1,
  },
  exerData: {
    color: '#03020B',
    fontSize: 14,
  },
  supportTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 600,
  },
  supportRightTxt: {
    color: '#F87643',
    fontSize: 16,
    fontWeight: 600,
  },
});
