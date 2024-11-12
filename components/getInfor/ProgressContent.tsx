import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressContentProps} from '../../services/renderData';
import VerticalNumberPicker from './VerticalNumberPicker';
import HeightWeightInput from './HeightWeightInput';
import BasketballExperience from './BasketballExperience';

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
          <Text style={styles.label}>What is your height and weight?</Text>
          <HeightWeightInput
            weight={userInfo.weight}
            height={userInfo.height}
            onWeightChange={value => setUserInfo({...userInfo, weight: value})}
            onHeightChange={value => setUserInfo({...userInfo, height: value})}
          />
        </View>
      );
    case 3:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            How long have you been playing basketball?
          </Text>
          <BasketballExperience
            experience={userInfo.playingTime}
            onExperienceChange={value =>
              setUserInfo({...userInfo, playingTime: value})
            }
          />
        </View>
      );
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
    flex: 1,
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
