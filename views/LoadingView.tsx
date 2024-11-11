import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {centerAll, containerStyle, text1, vh, vw} from '../services/styleProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const LoadingView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('finishOnboarding');
      if (token === 'true') {
        navigation.navigate('SignIn');
      } else {
        navigation.navigate('Onboarding');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        fetchToken();
      }, 3000);

      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={[styles.container, centerAll, {rowGap: vh(2)}]}>
      <StatusBar barStyle="light-content" backgroundColor={'#000000'} />
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
