/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  containerStyle,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {SettingsProps, UserProps} from '../../services/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserTmp} from '../../services/renderData';

const Settings = () => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await AsyncStorage.getItem('currentUser');
      if (res) {
        const parseData: UserProps = JSON.parse(res);
        setUser(parseData);
      } else {
        setUser(UserTmp);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <Text style={styles.headerTxt}>Settings</Text>
          <Image />
          <Main data={user} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Main: React.FC<SettingsProps> = () => {
  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.title}>Your acc</Text>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: containerStyle,
  headerTxt: {
    color: 'white',
    fontSize: 22,
    fontWeight: 600,
    textAlign: 'center',
    marginVertical: vh(2),
  },
  main: {
    paddingHorizontal: vw(5),
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 400,
  },
});
