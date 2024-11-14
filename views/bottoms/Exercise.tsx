/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
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
import {boneIcon, clockIcon, notiIcon, play2Icon, playIcon} from '../../assets/svgIcon';
import {TodayExerciseDataProps} from '../../services/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodayExerciseData} from '../../services/renderData';
import ToggleSwitch from 'toggle-switch-react-native';

const Exercise = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={scrollContainer}>
        <View style={{flex: 1}}>
          <Header />
          <TodayExercise />
          <Reminder />
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{columnGap: vw(5)}}>
        {todayExer.map((item, index) => {
          return (
            <ImageBackground
              style={styles.exerciseItem}
              source={require('../../assets/exercise/todayExer.png')}
              key={index}>
              <Text style={styles.exerTitle}>{item.title}</Text>
              <Text style={styles.exerLevel}>Level: {item.level}</Text>
              <View style={styles.exerBottom}>
                <View style={[rowCenter, styles.exerTimeGrp]}>
                  {playIcon(vw(3), vw(3), 'black')}
                  <Text style={{color: 'black', fontSize: 16}}>
                    {item.repeat}
                  </Text>
                </View>
                <View style={[rowCenter, styles.exerTimeGrp]}>
                  {clockIcon(vw(5), vw(5), 'black')}
                  <Text style={{color: 'black', fontSize: 16}}>
                    {item.time}
                  </Text>
                </View>
                <TouchableOpacity style={styles.exerBtnBottom}>
                  {play2Icon(vw(10), vw(10))}
                </TouchableOpacity>
              </View>
            </ImageBackground>
          );
        })}
      </ScrollView>
    </View>
  );
};

const Reminder: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <View style={styles.reminder}>
      <View style={[rowCenter]}>
        <View style={[rowCenter, {columnGap: vw(2)}]}>
          {notiIcon(vw(7), vw(7), '#F87643')}
          <Text style={styles.todayTitle}>Reminder</Text>
        </View>
        <View style={{position: 'absolute', right: 10}}>
          <ToggleSwitch
            isOn={toggle}
            onColor="#F87643"
            offColor="white"
            circleColor={'black'}
            size="small"
            onToggle={() => setToggle(!toggle)}
          />
        </View>
      </View>
      <View style={[styles.reminderTxtGrp]}>
        <Text style={styles.reminderTextLeft}>
          Don’t forget to complete your recovery exercises
        </Text>
        <Text style={styles.reminderTextRight}>6:00 PM</Text>
      </View>
      <View style={styles.reminderHorizontalLine} />
      <View style={[rowCenter]}>
        <View style={styles.boneContainer}>
          {boneIcon(vw(7), vw(7), '#F87643')}
        </View>
        <Text style={styles.reminderTxt}>
          Pain level has increased - consider taking it easy today.
        </Text>
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
  exerciseItem: {
    width: vw(70),
    height: vh(45),
    marginVertical: vh(2),
    borderRadius: 24,
    overflow: 'hidden',
    padding: vw(5),
  },
  exerTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
    fontFamily: 'RacingSansOne-Regular',
  },
  exerLevel: {
    color: 'white',
    fontSize: 16,
  },
  exerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: vw(5),
    columnGap: vw(2),
  },
  exerBtnBottom: {
    backgroundColor: '#F87643',
    padding: 2,
    borderRadius: vw(50),
  },
  exerTimeGrp: {
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignSelf: 'center',
  },
  reminder: {
    paddingHorizontal: vw(5),
    marginTop: vh(2),
  },
  reminderTxtGrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vh(1),
  },
  reminderTextLeft: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    width: '80%',
  },
  reminderTextRight: {
    color: '#F87643',
    fontSize: 16,
    fontWeight: '400',
    width: '20%',
  },
  reminderHorizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFFFFF33',
    marginVertical: vh(1),
  },
  reminderTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    width: '80%',
  },
  boneContainer: {
    padding: vw(2),
    borderRadius: vw(50),
    backgroundColor: '#F8764333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vw(2),
  },
});
