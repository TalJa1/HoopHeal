import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnboardingComponentProps} from '../../services/typeProps';
import {vh, vw} from '../../services/styleProps';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingComponent: React.FC<OnboardingComponentProps> = ({
  description,
  img,
  title,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('finishOnboarding', 'true');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topImgView}>
        <Image source={img} style={styles.image} />
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipTxt}>Skip</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textGrp}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  topImgView: {
    backgroundColor: '#F87643',
    height: vh(50),
    width: vw(100),
  },
  image: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: vh(60),
    resizeMode: 'cover',
  },
  textGrp: {
    height: vh(50),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(5),
    rowGap: vh(2),
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: '#F87643',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  skipBtn: {
    position: 'absolute',
    top: vh(5),
    right: vw(5),
    backgroundColor: '#00000040',
    padding: 5,
    borderRadius: 8,
  },
  skipTxt: {
    color: '#BABABA',
    fontSize: 16,
  },
});
