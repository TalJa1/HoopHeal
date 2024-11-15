/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  containerStyle,
  marginHorizontal,
  rowCenter,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {
  WorkoutDetailProps,
  WorkoutDetailRouteProp,
  WorkoutProps,
} from '../../services/typeProps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {backArrowIcon, circleWOIcon, nextIcon} from '../../assets/svgIcon';
import {WorkoutData} from '../../services/renderData';

const Workout = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<WorkoutDetailRouteProp>();
  const {selectedIndex} = route.params;
  const [data, setData] = useState<WorkoutProps>({
    title: '',
    times: 0,
    img: null,
    description: '',
    howTodo: [],
  });

  useEffect(() => {
    setData(WorkoutData[selectedIndex]);
  }, [selectedIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <View>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => navigation.goBack()}>
              {backArrowIcon(vw(7), vw(7), 'black')}
            </TouchableOpacity>
            <Image
              style={styles.headerImg}
              source={require('../../assets/exercise/woDetail.png')}
            />
          </View>
          <Main data={data} />
          <TouchableOpacity
            style={[styles.woBtn]}
            disabled={true}>
            <Text style={styles.woBtnTxt}>Save</Text>
            <View style={styles.woNextIcon}>
              {nextIcon(vw(7), vw(7), 'black')}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Main: React.FC<WorkoutDetailProps> = ({data}) => {
  return (
    <View style={[styles.main, marginHorizontal]}>
      <Text style={styles.mainTitle}>{data.title}</Text>
      <Text style={styles.mainTimes}>{data.times} times</Text>
      <View>
        <Text style={styles.mainDes}>Descriptions</Text>
        <Text style={styles.mainDessub}>{data.description}</Text>
      </View>
      <View style={[rowCenter, {justifyContent: 'space-between'}]}>
        <Text style={styles.mainDes}>How to do</Text>
        <Text style={styles.steps}>(4 steps)</Text>
      </View>
      <View style={{width: '100%'}}>
        {data.howTodo.map((item, index) => (
          <View key={index} style={styles.howTodoItem}>
            <View style={styles.howTodoIndex}>
              <Text style={styles.indexText}>
                {String(index + 1).padStart(2, '0')}
              </Text>
              {circleWOIcon(vw(5), vw(5))}
            </View>
            <Text style={styles.howTodoText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: containerStyle,
  headerBtn: {
    position: 'absolute',
    top: vh(3),
    left: vw(5),
    zIndex: 1,
    backgroundColor: '#BABABA',
    padding: 8,
    borderRadius: vw(50),
  },
  headerImg: {
    width: '100%',
    height: vh(30),
    resizeMode: 'cover',
  },
  main: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: 'RacingSansOne-Regular',
    color: '#F87643',
  },
  mainTimes: {
    fontSize: 14,
    color: '#7B6F72',
  },
  mainDes: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 600,
    marginVertical: vh(2),
  },
  mainDessub: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  steps: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F87643',
  },
  howTodoItem: {
    flexDirection: 'row',
    marginBottom: vh(2),
  },
  howTodoIndex: {
    marginRight: vw(2),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  indexText: {
    fontSize: 14,
    color: '#E65A4B',
    marginRight: vw(3),
  },
  howTodoText: {
    fontSize: 14,
    width: vw(65),
    color: 'white',
  },
  dashedLine: {
    width: 1,
    height: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E65A4B',
    marginTop: vh(1),
  },
  woBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: vw(3),
    alignSelf: 'center',
    backgroundColor: '#F87643',
    borderRadius: 12,
    columnGap: vw(4),
    paddingHorizontal: vw(7),
    marginBottom: vh(2),
  },
  woBtnTxt: {
    color: '#03020B',
    fontSize: 18,
    fontWeight: '600',
  },
  woNextIcon: {
    backgroundColor: '#03020B',
    opacity: 0.5,
    borderRadius: 5,
  },
});
