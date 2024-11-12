/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle} from '../../services/styleProps';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ggUserProps, UserProps} from '../../services/typeProps';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Text style={{color: 'white'}}>GetUserInfor</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GetUserInfor;

const styles = StyleSheet.create({
  container: containerStyle,
});
