import Slider from '@react-native-community/slider';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressContentProps} from '../../services/renderData';
import VerticalNumberPicker from './VerticalNumberPicker';

const ProgressContent: React.FC<ProgressContentProps> = ({
  progressState,
  userInfo,
  setUserInfo,
}) => {
  switch (progressState) {
    case 1:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>How old are you?</Text>
          <VerticalNumberPicker
            min={0}
            max={100}
            value={userInfo.age}
            onValueChange={value => setUserInfo({...userInfo, age: value})}
          />
        </View>
      );
    case 2:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Weight</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={200}
            step={1}
            value={userInfo.weight}
            onValueChange={value => setUserInfo({...userInfo, weight: value})}
          />
          <Text style={styles.value}>{userInfo.weight} kg</Text>
        </View>
      );
    // Add more cases for other progress states
    default:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Default Content</Text>
        </View>
      );
  }
};

export default ProgressContent;

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#BABABA',
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'RacingSansOne-Regular',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  value: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
