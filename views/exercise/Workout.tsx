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
import {backArrowIcon} from '../../assets/svgIcon';
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
});
