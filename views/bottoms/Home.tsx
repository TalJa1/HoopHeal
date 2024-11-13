/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerStyle, vh, vw} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ProgressRightComponentProps,
  TodayExerciseDataProps,
  UserProps,
} from '../../services/typeProps';
import {homeUpperProgressIcon, notiIcon} from '../../assets/svgIcon';
import * as Progress from 'react-native-progress';
import {TodayExerciseData} from '../../services/renderData';
import ToggleSwitch from 'toggle-switch-react-native';

const Home = () => {
  const [profile, setProfile] = useState<UserProps | null>(null);
  const fetchData = async () => {
    const data = await AsyncStorage.getItem('listUser');
    if (data) {
      const parsedData: UserProps[] = JSON.parse(data);
      setProfile(parsedData[parsedData.length - 1]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Header data={profile} />
          <UpperProgress />
          <TodayExercise />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TodayExercise: React.FC = () => {
  const [exercises, setExercises] = useState<TodayExerciseDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('todayExercise');
      if (data) {
        const parsedData: TodayExerciseDataProps[] = JSON.parse(data);
        setExercises(parsedData);
      } else {
        setExercises(TodayExerciseData);
        await AsyncStorage.setItem(
          'todayExercise',
          JSON.stringify(TodayExerciseData),
        );
      }
    };
    fetchData();
  }, []);

  const handleToggle = (index: number) => {
    const newExercises = [...exercises];
    newExercises[index].notify = !newExercises[index].notify;
    setExercises(newExercises);
    AsyncStorage.setItem('todayExercise', JSON.stringify(newExercises));
  };

  return (
    <View style={styles.todayExer}>
      <View style={styles.todayTitleGrp}>
        <Text style={styles.todayTitle}>Today's Exercise</Text>
        <Text style={styles.more}>More</Text>
      </View>
      <View style={{marginVertical: vh(2), rowGap: vh(2)}}>
        {exercises.map((item, index) => (
          <View key={index} style={styles.exercise}>
            {/* <Image style={styles.exerImg} source={item.img} /> */}
            <Image
              style={styles.exerImg}
              source={require('../../assets/home/exer1.png')}
            />
            <View>
              <Text style={styles.exerciseTitle}>{item.title}</Text>
              <View style={styles.exerTimeGrp}>
                <Text style={styles.exerRepeat}>{item.repeat}</Text>
                <View style={styles.excerVertical} />
                <Text style={styles.exerTime}>{item.time}</Text>
              </View>
            </View>
            <View style={{position: 'absolute', right: 20}}>
              <ToggleSwitch
                isOn={item.notify}
                onColor="#F87643"
                offColor="#A09F9F"
                size="small"
                onToggle={() => handleToggle(index)}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const UpperProgress: React.FC = () => {
  const progress = 0.4;
  return (
    <View style={styles.upperProgress}>
      <View style={styles.progressLeft}>
        <Text style={styles.recoverTxt}>Recovery Progress</Text>
        {/* render here */}
        <Progress.Circle
          size={vw(28)}
          progress={progress}
          showsText={false}
          color={'#03020B'}
          unfilledColor={'#BABABA'}
          style={{alignItems: 'center', justifyContent: 'center'}}
          borderWidth={0}
          thickness={10}>
          <View style={styles.progressTextWrapper}>
            <Text style={styles.progressText}>{`${Math.round(
              progress * 100,
            )}%`}</Text>
          </View>
        </Progress.Circle>
      </View>
      <View style={styles.progressRight}>
        <ProgressRightComponent label="Timing" description="3w remaining" />
        <ProgressRightComponent
          label="Milestone"
          description="Achieved 75% mobility"
        />
        <ProgressRightComponent
          label="Completed excer"
          description="80% this week"
        />
      </View>
    </View>
  );
};

const ProgressRightComponent: React.FC<ProgressRightComponentProps> = ({
  description,
  label,
}) => {
  const renderStyledText = (text: string) => {
    return text.split(/(\d+\S*\s)/).map((part, index) => {
      const isNumber = /^\d/.test(part);
      return (
        <Text
          key={index}
          style={isNumber ? styles.numberText : styles.letterText}>
          {part}
        </Text>
      );
    });
  };

  return (
    <View>
      <Text>{label}</Text>
      {homeUpperProgressIcon('100%', 10)}
      <Text>{renderStyledText(description)}</Text>
    </View>
  );
};

const Header: React.FC<{data: UserProps | null}> = ({data}) => {
  return (
    <View style={styles.header}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', columnGap: vw(3)}}>
        <View>
          {data?.photo !== null ? (
            <Image style={styles.headerImg} source={{uri: data?.photo}} />
          ) : (
            <Image
              style={styles.headerImg}
              source={require('../../assets/home/avatar.png')}
            />
          )}
        </View>
        <View>
          <Text style={styles.name}>
            Hello {data?.name === null ? 'Mark' : `${data?.name}`}
          </Text>
          <Text style={styles.underName}>Let’s start your day</Text>
        </View>
      </View>
      {notiIcon(vw(7), vw(7), '#F87643')}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: containerStyle,
  headerImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  header: {
    paddingHorizontal: vw(5),
    marginVertical: vh(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  underName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  upperProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(5),
    marginTop: vh(2),
    backgroundColor: '#F87643',
    paddingHorizontal: vw(4),
    paddingVertical: vh(3),
    borderRadius: 20,
  },
  progressLeft: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingHorizontal: vw(2),
    paddingVertical: vh(2),
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: vh(2),
  },
  progressRight: {
    height: '100%',
    backgroundColor: '#F87643',
    borderRadius: 10,
    rowGap: vh(1),
  },
  recoverTxt: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
  },
  progressText: {
    color: '#03020B',
    fontWeight: '900',
    fontSize: 20,
  },
  progressTextWrapper: {
    position: 'absolute',
    backgroundColor: '#F87643',
    borderRadius: vw(50),
    width: vw(20),
    height: vw(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: 'black',
  },
  letterText: {
    color: 'white',
  },
  todayExer: {
    marginHorizontal: vw(5),
    marginTop: vh(2),
    borderRadius: 20,
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
  exercise: {
    flexDirection: 'row',
    padding: vw(2),
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    columnGap: vw(1),
  },
  exerciseTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  exerImg: {
    width: vw(15),
    height: vw(15),
    resizeMode: 'cover',
  },
  exerTimeGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: vw(2),
  },
  exerRepeat: {
    color: '#A09F9F',
    fontSize: 12,
    fontWeight: '300',
  },
  excerVertical: {
    width: 1,
    height: '100%',
    backgroundColor: '#A09F9F',
  },
  exerTime: {
    color: '#A09F9F',
    fontSize: 12,
    fontWeight: '300',
  },
});
