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
import {
  blindPassIcon,
  checkSaveIcon,
  signInStarIcon,
} from '../../assets/svgIcon';
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
              <View style={{flexDirection: 'row', columnGap: vw(2)}}>
                {checkSaveIcon(vw(5), vw(5))}
                <Text style={styles.rememberText}>Remember</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.additionalOptions}>
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>Sign in with</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../assets/login/fb.png')} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../assets/login/gg.png')} style={styles.socialIcon} />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Bạn chưa có tài khoản?</Text>
              <TouchableOpacity>
                <Text style={styles.signUpButton}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
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
          style={[styles.input, label === 'Password' && {paddingRight: vw(10)}]}
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
    borderRadius: 20,
    paddingHorizontal: vw(3),
    color: '#BABABA',
    width: '100%',
    height: vh(7),
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
    color: '#BABABA',
  },
  blindBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: vw(3),
  },
  additionalOptions: {
    marginTop: 20,
    paddingHorizontal: vw(5),
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#7C7C7C',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    columnGap: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    height: vh(7),
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#7C7C7C',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  signUpButton: {
    fontSize: 14,
    color: '#BABABA',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
