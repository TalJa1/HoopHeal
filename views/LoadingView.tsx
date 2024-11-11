import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {centerAll, containerStyle, text1, vh, vw} from '../services/styleProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const LoadingView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('firstTime');
      if (token) {
        console.log('Home');
      } else {
        navigation.navigate('Onboarding');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchToken();
    }, 3000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, centerAll, {rowGap: vh(2)}]}>
      <Image
        style={styles.logo}
        source={require('../assets/loading/Logo.png')}
      />
      <Text style={text1}>“From hoops to healing, back to winning”</Text>
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: containerStyle,
  logo: {
    width: vw(90),
    height: vw(90),
    resizeMode: 'contain',
  },
});
