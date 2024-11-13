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
import {containerStyle, rowCenter, vh, vw} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ProgressRightComponentProps,
  TodayExerciseDataProps,
  UserProps,
} from '../../services/typeProps';
import {
  arrowDownIcon,
  boneIcon,
  homeUpperProgressIcon,
  notiIcon,
} from '../../assets/svgIcon';
import * as Progress from 'react-native-progress';
import {TodayExerciseData} from '../../services/renderData';
import ToggleSwitch from 'toggle-switch-react-native';
import Svg, {Line, G, Text as SvgText, Path, Circle} from 'react-native-svg';
import * as d3 from 'd3-shape';

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
          <Matplotlib />
          <Reminder />
        </View>
      </ScrollView>
    </SafeAreaView>
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

const Matplotlib: React.FC = () => {
  const data1 = [2, 8, 6, 2, 6, 7, 1]; // Example data for Pain level
  const data2 = [10, 40, 20, 25, 80, 10, 26]; // Example data for Range of motion
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [selectedData, setSelectedData] = useState<{
    day: string;
    value: number;
    type: string;
  } | null>(null);

  const chartWidth = vw(90);
  const chartHeight = vh(40);
  const padding = 20;
  const stepX = (chartWidth - padding * 2) / (days.length - 1);
  const stepY1 = (chartHeight - padding * 2) / 10;
  const stepY2 = (chartHeight - padding * 2) / 80;

  const line1 = d3
    .line<number>()
    .x((d: number, i: number) => padding + i * stepX)
    .y((d: number) => chartHeight - padding - d * stepY1)
    .curve(d3.curveCatmullRom.alpha(0.5));

  const line2 = d3
    .line<number>()
    .x((d: number, i: number) => padding + i * stepX)
    .y((d: number) => chartHeight - padding - d * stepY2)
    .curve(d3.curveCatmullRom.alpha(0.5));

  const handlePress = (day: string, value: number, type: string) => {
    setSelectedData({day, value, type});
  };

  return (
    <View style={styles.matplotlib}>
      <Text style={styles.todayTitle}>Matplotlib Chart</Text>
      <View style={{marginVertical: vh(1)}}>
        <View style={[rowCenter, {columnGap: vw(4)}]}>
          <View style={[rowCenter, {columnGap: vw(1)}]}>
            <View style={styles.purple} />
            <Text style={styles.matplotTxt}>Pain level</Text>
          </View>
          <View style={[rowCenter, {columnGap: vw(1)}]}>
            <View style={styles.orange} />
            <Text style={styles.matplotTxt}>Range of motion</Text>
          </View>
        </View>
        <View
          style={[
            rowCenter,
            {position: 'absolute', bottom: 0, right: 0},
            styles.matDropdown,
          ]}>
          <Text style={styles.matplotTxt}>7 days</Text>
          {arrowDownIcon(vw(5), vw(5), 'white')}
        </View>
      </View>
      <View>
        <Svg width={chartWidth} height={chartHeight}>
          <G>
            {days.map((day, index) => (
              <SvgText
                key={index}
                x={padding + index * stepX}
                y={chartHeight - padding + 15}
                fontSize="10"
                fill="#8D9092"
                textAnchor="middle">
                {day}
              </SvgText>
            ))}
            {[0, 2, 4, 6, 8, 10].map((value, index) => (
              <SvgText
                key={index}
                x={padding - 10}
                y={chartHeight - padding - value * stepY1}
                fontSize="10"
                fill="#8D9092"
                textAnchor="end">
                {value}
              </SvgText>
            ))}
            {[0, 20, 40, 60, 80].map((value, index) => (
              <SvgText
                key={index}
                x={chartWidth - padding + 10}
                y={chartHeight - padding - value * stepY2}
                fontSize="10"
                fill="#8D9092"
                textAnchor="start">
                {value}
              </SvgText>
            ))}
            <Line
              x1={padding}
              y1={chartHeight - padding}
              x2={chartWidth - padding}
              y2={chartHeight - padding}
              stroke="black"
            />
            <Line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={chartHeight - padding}
              stroke="black"
            />
            <Path
              d={line1(data1) as string}
              stroke="#F87643"
              strokeWidth="2"
              fill="none"
            />
            <Path
              d={line2(data2) as string}
              stroke="#A3A3F2"
              strokeWidth="2"
              fill="none"
            />
            {data1.map((value, index) => (
              <TouchableOpacity
                key={`data1-${index}`}
                onPress={() => handlePress(days[index], value, 'Pain level')}>
                <Circle
                  cx={padding + index * stepX}
                  cy={chartHeight - padding - value * stepY1}
                  r={4}
                  fill="#F87643"
                />
              </TouchableOpacity>
            ))}
            {data2.map((value, index) => (
              <TouchableOpacity
                key={`data2-${index}`}
                onPress={() =>
                  handlePress(days[index], value, 'Range of motion')
                }>
                <Circle
                  cx={padding + index * stepX}
                  cy={chartHeight - padding - value * stepY2}
                  r={4}
                  fill="#A3A3F2"
                />
              </TouchableOpacity>
            ))}
          </G>
        </Svg>
      </View>
      {selectedData && (
        <View style={styles.dataTooltip}>
          <Text style={{color: 'white'}}>{`${selectedData.value}`}</Text>
        </View>
      )}
    </View>
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
  matplotlib: {
    marginHorizontal: vw(5),
    marginVertical: vh(2),
  },
  purple: {
    width: 11,
    height: 11,
    borderRadius: 4,
    backgroundColor: '#A3A3F2',
  },
  orange: {
    width: 11,
    height: 11,
    borderRadius: 4,
    backgroundColor: '#F87643',
  },
  matplotTxt: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  matDropdown: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: vw(2),
    paddingVertical: 3,
  },
  dataTooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    top: 10,
    right: 10,
  },
  reminder: {
    marginHorizontal: vw(5),
    marginVertical: vh(2),
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
    backgroundColor: '#8F8F8F',
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
