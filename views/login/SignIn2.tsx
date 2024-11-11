/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerStyle, vh, vw} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {blindPassIcon, signInStarIcon} from '../../assets/svgIcon';
import {InputFieldProps} from '../../services/typeProps';

const SignIn2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Header />
          <View style={styles.inputGrp}>
            <InputField label="Email" value={email} onChangeText={setEmail} />
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              showPasswordToggle
              onTogglePasswordVisibility={handleTogglePasswordVisibility}
              isPasswordVisible={isPasswordVisible}
            />
            <View style={styles.rememberForgotContainer}>
              <Text style={styles.rememberText}>Remember</Text>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerhorizontal}>
        <Image source={require('../../assets/login/logo.png')} />
        {signInStarIcon(vw(10), vw(10))}
      </View>
      <View style={styles.welcomeGrp}>
        <Text style={styles.welcome}>Welcome</Text>
        <Image source={require('../../assets/login/waving.png')} />
      </View>
    </View>
  );
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  onTogglePasswordVisibility,
  isPasswordVisible,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, label === 'Password' && {paddingRight: vw(20)}]}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            onPress={onTogglePasswordVisibility}
            style={styles.blindBtn}>
            {blindPassIcon(24, 24, '#8F8F8F')}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SignIn2;

const styles = StyleSheet.create({
  container: containerStyle,
  header: {
    paddingHorizontal: vw(5),
    paddingVertical: vh(2),
  },
  headerhorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeGrp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(3),
    columnGap: vw(5),
  },
  welcome: {
    fontSize: 28,
    fontWeight: '700',
    color: '#BABABA',
  },
  inputGrp: {
    paddingHorizontal: vw(5),
    paddingVertical: vh(2),
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#BABABA',
  },
  input: {
    borderWidth: 1,
    borderColor: '#8F8F8F',
    paddingVertical: 15,
    borderRadius: 5,
    paddingHorizontal: vw(3),
    color: '#BABABA',
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#F87643',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitTxt: {
    color: 'black',
    fontSize: 16,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberText: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  forgotText: {
    fontSize: 14,
    color: '#F87643',
    fontWeight: 'bold',
  },
  blindBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: vw(3),
  },
});
