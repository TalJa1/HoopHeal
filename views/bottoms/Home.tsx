/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerStyle, vh, vw} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProgressRightComponentProps, UserProps} from '../../services/typeProps';
import {homeUpperProgressIcon, notiIcon} from '../../assets/svgIcon';
import * as Progress from 'react-native-progress';

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
  return <View></View>;
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
});
