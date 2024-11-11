/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {centerAll, containerStyle, vh, vw} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LoginButtonTypeProps} from '../../services/typeProps';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const SignIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={[centerAll, {flex: 1, rowGap: vh(2)}]}>
          <Image
            style={styles.logo}
            source={require('../../assets/loading/Logo.png')}
          />
          <View style={styles.loginGrp}>
            <View style={{width: '100%', marginVertical: vh(2), rowGap: vh(1)}}>
              <LoginTypeButton
                image={require('../../assets/login/gg.png')}
                title="Google"
              />
              <LoginTypeButton
                image={require('../../assets/login/apple.png')}
                title="Apple"
              />
              <LoginTypeButton
                image={require('../../assets/login/mail.png')}
                title="Email"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: vw(2),
            }}>
            <Text style={{color: '#7C7C7C'}}>You already have account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={{color: '#F7F9FA', fontWeight: 'bold'}}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const LoginTypeButton: React.FC<LoginButtonTypeProps> = ({image, title}) => {
  return (
    <TouchableOpacity style={styles.loginBtn}>
      <Image
        style={{width: vw(5), height: vw(5), resizeMode: 'contain'}}
        source={image}
      />
      <Text style={{color: '#A7A7A7', fontSize: 18}}>Continue with {title}</Text>
    </TouchableOpacity>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: containerStyle,
  logo: {
    width: vw(80),
    height: vw(80),
    resizeMode: 'contain',
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: vw(4),
    backgroundColor: '#1B1B1B',
    width: '100%',
    padding: vw(4),
    borderRadius: 30,
  },
  headerImg: {
    width: vw(30),
    height: vw(30),
    resizeMode: 'contain',
  },
  loginGrp: {
    backgroundColor: '#F87643',
    borderRadius: 32,
    width: vw(90),
    alignItems: 'center',
    paddingVertical: vh(2),
    paddingHorizontal: vw(2),
  },
});
