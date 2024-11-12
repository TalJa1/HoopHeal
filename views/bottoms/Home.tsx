/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerStyle, vh, vw} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserProps} from '../../services/typeProps';
import {notiIcon} from '../../assets/svgIcon';

const Home = () => {
  const [profile, setProfile] = useState<UserProps | null>(null);
  const fetchData = async () => {
    const data = await AsyncStorage.getItem('listUser');
    if (data) {
      const parsedData: UserProps[] = JSON.parse(data);
      setProfile(parsedData[parsedData.length - 1]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Header data={profile} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC<{data: UserProps | null}> = ({data}) => {
  return (
    <View style={styles.header}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', columnGap: vw(3)}}>
        <View>
          {data?.photo !== null ? (
            <Image style={styles.headerImg} source={{uri: data?.photo}} />
          ) : (
            <Image
              style={styles.headerImg}
              source={require('../../assets/home/avatar.png')}
            />
          )}
        </View>
        <View>
          <Text style={styles.name}>
            Hello {data?.name === null ? 'Mark' : `${data?.name}`}
          </Text>
          <Text style={styles.underName}>Let’s start your day</Text>
        </View>
      </View>
      {notiIcon(vw(7), vw(7), '#F87643')}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: containerStyle,
  headerImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  header: {
    paddingHorizontal: vw(5),
    marginVertical: vh(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  underName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
