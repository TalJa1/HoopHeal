/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressContentProps} from '../../services/renderData';
import VerticalNumberPicker from './VerticalNumberPicker';
import HeightWeightInput from './HeightWeightInput';
import BasketballExperience from './BasketballExperience';
import InjuryTypeSelection from './InjuryTypeSelection';
import InjuryTimeLast from './InjuryTimeLast';
import {vh, vw} from '../../services/styleProps';
import Slider from '@react-native-community/slider';
import YesNoComponent from './YesNoComponent';

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
    case 4:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>What type of injury do you have?</Text>
          <InjuryTypeSelection
            selectedInjuries={userInfo.injury}
            onInjuryChange={selected =>
              setUserInfo({...userInfo, injury: selected})
            }
          />
        </View>
      );
    case 5:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>How long have you had this injury?</Text>
          <InjuryTimeLast
            injuryTimeLast={userInfo.injuryLast}
            onInjuryTimeLast={(v: string) =>
              setUserInfo({...userInfo, injuryLast: v})
            }
          />
        </View>
      );
    case 6:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            What is your current pain level (on a scale of 1-10)?
          </Text>
          <View style={{marginTop: vh(2)}}>
            <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: '900'}}>
              Slide
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 48,
                fontWeight: '900',
                textAlign: 'center',
              }}>
              {userInfo.painLevel}
            </Text>
            <Slider
              style={{width: vw(90), height: vh(5)}}
              value={userInfo.painLevel}
              onValueChange={value =>
                setUserInfo({...userInfo, painLevel: value})
              }
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#F87643"
              thumbTintColor="white"
              step={1}
            />
          </View>
        </View>
      );
    case 7:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Do you have difficulty moving?</Text>
          <YesNoComponent
            value={userInfo.isMovingDifficult}
            onValueChange={v =>
              setUserInfo({...userInfo, isMovingDifficult: v})
            }
          />
        </View>
      );
    case 8:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Have you had this injury before?</Text>
          <YesNoComponent
            value={userInfo.hasSameInjuryBefore}
            onValueChange={v =>
              setUserInfo({...userInfo, hasSameInjuryBefore: v})
            }
          />
        </View>
      );
    case 9:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Do you have swelling or bruising?</Text>
          <YesNoComponent
            value={userInfo.swellingBruising}
            onValueChange={v =>
              setUserInfo({...userInfo, swellingBruising: v})
            }
          />
        </View>
      );
    case 10:
      return (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Have you received medical treatment for this injury?</Text>
          <YesNoComponent
            value={userInfo.medicalTreatment}
            onValueChange={v =>
              setUserInfo({...userInfo, medicalTreatment: v})
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
