import React, {useState} from 'react';
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

const GetUserInfor: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {userData} = route.params as {userData: ggUserProps};

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

  console.log('userInfo', userInfo);

  const handleNext = () => {
    if (progressState === 13) {
      navigation.navigate('Home');
    } else {
      setProgressState(progressState + 1);
    }
  };

  const handleSkip = () => {
    if (progressState === 13) {
      navigation.navigate('Home');
    } else {
      setProgressState(progressState + 1);
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
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
