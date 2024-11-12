import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle, vh, vw} from '../../services/styleProps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ggUserProps, UserProps} from '../../services/typeProps';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {backIcon} from '../../assets/svgIcon';
import * as Progress from 'react-native-progress';

const GetUserInfor = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const {userData} = route.params as {userData: ggUserProps};
  const [userInfo, setUserInfo] = useState<UserProps>({
    email: userData.email,
    familyName: userData.familyName ?? '',
    givenName: userData.givenName ?? '',
    id: userData.id,
    name: userData.name ?? '',
    photo: userData.photo,
    age: 0,
    weight: 0,
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

  const handleNext = () => {
    // Handle next button press
  };

  const handleSkip = () => {
    // Handle skip button press
  };

  const handleBack = () => {
    // Handle back button press
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          {backIcon(24, 24, 'white')}
        </TouchableOpacity>
        <Progress.Bar
          progress={0.5}
          width={vw(55)}
          color={'#F87643'}
          borderColor="black"
        />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View />
        {/* Add more form fields as needed */}
      </ScrollView>
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
    paddingHorizontal: vw(5),
    paddingVertical: vh(2),
  },
  backBtn: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BABABA',
  },
  skipText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  footer: {
    paddingHorizontal: vw(5),
    marginVertical: vh(2),
  },
  nextButton: {
    backgroundColor: '#F87643',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#03020B',
    fontSize: 18,
    fontWeight: '600',
  },
});
