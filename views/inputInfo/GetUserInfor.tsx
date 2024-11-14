/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserProps, ggUserProps} from '../../services/typeProps';
import * as Progress from 'react-native-progress';
import {backIcon} from '../../assets/svgIcon';
import {vw, vh, containerStyle} from '../../services/styleProps';
import ProgressContent from '../../components/getInfor/ProgressContent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetUserInfor: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {userData} = route.params as {userData: ggUserProps};
  const [disableBtn, setDisableBtn] = useState(true);
  const [progressState, setProgressState] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<UserProps>({
    email: userData.email,
    familyName: userData.familyName ?? '',
    givenName: userData.givenName ?? '',
    id: userData.id,
    name: userData.name ?? '',
    photo: userData.photo,
    age: 18,
    weight: '',
    height: '',
    playingTime: '',
    injury: [],
    injuryLast: '',
    painLevel: 0,
    isMovingDifficult: false,
    hasSameInjuryBefore: false,
    swellingBruising: false,
    medicalTreatment: false,
    hopeforRecovery: '',
    reminderDailyforExerciseat: '',
    adviceFromPro: false,
  });

  useEffect(() => {
    switch (progressState) {
      case 1:
        if (userInfo.age > 0) {
          setDisableBtn(false);
        }
        break;
      case 2:
        if (userInfo.weight.length > 0 && userInfo.height.length > 0) {
          setDisableBtn(false);
        }
        break;
      case 3:
        if (userInfo.playingTime.length > 0) {
          setDisableBtn(false);
        }
        break;
      case 4:
        if (userInfo.injury.length > 0) {
          setDisableBtn(false);
        } else {
          setDisableBtn(true);
        }
        break;
      case 5:
        if (userInfo.injuryLast.length > 0) {
          setDisableBtn(false);
        }
        break;
      case 6:
        setDisableBtn(false);
        break;
      case 7:
        setDisableBtn(false);
        break;
      case 8:
        setDisableBtn(false);
        break;
      case 9:
        setDisableBtn(false);
        break;
      case 10:
        setDisableBtn(false);
        break;
      case 11:
        if (userInfo.hopeforRecovery.length > 0) {
          setDisableBtn(false);
        }
        break;
      case 12:
        setDisableBtn(false);
        break;
      case 13:
        setDisableBtn(false);
        break;
      default:
        setDisableBtn(false);
        break;
    }
  }, [progressState, userInfo]);

  const handleNext = async () => {
    if (progressState === 13) {
      const listUserString = await AsyncStorage.getItem('listUser');
      const listUser: UserProps[] = listUserString
        ? JSON.parse(listUserString)
        : [];
      listUser.push(userInfo);
      await AsyncStorage.setItem('listUser', JSON.stringify(listUser));
      await AsyncStorage.setItem('currentUser', JSON.stringify(userInfo));
      navigation.navigate('Main');
    } else {
      setProgressState(progressState + 1);
      setDisableBtn(true);
    }
  };

  const handleSkip = async () => {
    if (progressState === 13) {
      const listUserString = await AsyncStorage.getItem('listUser');
      const listUser: UserProps[] = listUserString
        ? JSON.parse(listUserString)
        : [];
      listUser.push(userInfo);
      await AsyncStorage.setItem('listUser', JSON.stringify(listUser));
      await AsyncStorage.setItem('currentUser', JSON.stringify(userInfo));
      navigation.navigate('Main');
    } else {
      setProgressState(progressState + 1);
      setDisableBtn(true);
    }
  };

  const handleBack = () => {
    if (progressState === 1) {
      navigation.goBack();
    } else {
      setProgressState(progressState - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          {backIcon(24, 24, 'white')}
        </TouchableOpacity>
        <Progress.Bar
          progress={progressState / 13}
          width={vw(55)}
          height={vh(1)}
          borderRadius={vw(50)}
          color={'#F87643'}
          borderColor="black"
        />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[{key: 'content'}]}
        renderItem={() => (
          <View style={styles.content}>
            <ProgressContent
              progressState={progressState}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            disableBtn && {backgroundColor: '#BABABA'},
          ]}
          onPress={handleNext}
          disabled={disableBtn}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetUserInfor;

const styles = StyleSheet.create({
  container: containerStyle,
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#BABABA',
    borderRadius: 10,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  footer: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: '#F87643',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
