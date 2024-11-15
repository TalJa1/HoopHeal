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
  marginHorizontal,
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
import {WorkoutData} from '../../services/renderData';

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
          <WorkOut />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const WorkOut: React.FC = () => {
  return (
    <View style={[marginHorizontal]}>
      <Text style={styles.supportTitle}>Workout</Text>
      <View style={styles.woContainer}>
        {WorkoutData.map((item, index) => {
          return (
            <TouchableOpacity key={index} style={[styles.woItem, rowCenter]}>
              <View style={[rowCenter, {columnGap: vw(2)}]}>
                <Image source={item.img} style={styles.woImg} />
                <Text style={styles.woTxt}>{item.title}</Text>
              </View>
              <Text style={styles.woTimes}>{item.times}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const SupportItem: React.FC = () => {
  const renderData = [
    {
      label: 'Towel',
      img: require('../../assets/exercise/towel.png'),
    },
    {
      label: 'Water',
      img: require('../../assets/exercise/water.png'),
    },
  ];

  return (
    <View style={[marginHorizontal]}>
      <View style={[rowCenter, {justifyContent: 'space-between'}]}>
        <Text style={styles.supportTitle}>Support tool</Text>
        <Text style={styles.supportRightTxt}>(2)</Text>
      </View>
      <View style={[rowCenter, {columnGap: vw(2)}]}>
        {renderData.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                alignSelf: 'flex-start',
                width: '30%',
                marginVertical: vh(2),
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: vw(25),
                  height: vw(25),
                  resizeMode: 'contain',
                }}
                source={item.img}
              />
              <Text
                style={{color: '#8F8F8F', fontSize: 16, textAlign: 'center'}}>
                {item.label}
              </Text>
            </View>
          );
        })}
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
  woContainer: {
    rowGap: vh(1.5),
    marginVertical: vh(2),
  },
  woItem: {
    justifyContent: 'space-between',
    padding: vw(3),
    borderColor: '#8F8F8F',
    borderWidth: 1,
    borderRadius: 12,
  },
  woImg: {
    width: vw(15),
    height: vw(15),
    resizeMode: 'contain',
    borderRadius: 12,
  },
  woTxt: {
    color: '#6D6E6F',
    fontSize: 16,
  },
  woTimes: {
    color: '#6D6E6F',
    fontSize: 16,
  },
});
