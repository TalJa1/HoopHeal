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
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  containerStyle,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {WorkoutDetailRouteProp} from '../../services/typeProps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {backArrowIcon} from '../../assets/svgIcon';

const Workout = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<WorkoutDetailRouteProp>();
  const {selectedIndex} = route.params;

  console.log('selectedIndex', selectedIndex);

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
          <Text>Workout</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
});
