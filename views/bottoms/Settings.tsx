/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  containerStyle,
  rowCenter,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {
  AccountRenderProps,
  SettingsFieldProps,
  SettingsProps,
  UserProps,
} from '../../services/typeProps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserTmp} from '../../services/renderData';
import {
  aboutUsIcon,
  nextIcon,
  notiIcon,
  settingIcon,
  settingPassIcon,
  settingUserIcon,
  signOutIcon,
} from '../../assets/svgIcon';
import ToggleSwitch from 'toggle-switch-react-native';

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
          <Image style={styles.avatar} source={require('../../assets/settings/avatar.png')}/>
          <Main data={user} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Main: React.FC<SettingsProps> = ({data}) => {
  const [notif, setNotif] = useState({
    noti: false,
    privacy: false,
    aboutUs: false,
  });

  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.title}>Your acc</Text>
        <View>
          <AccountRender label="Name" data={data?.name || ''} />
          <AccountRender label="Email" data={data?.email || ''} />
          <AccountRender
            label="Change password"
            isUser={false}
            data={'************'}
          />
          <AccountRender label="DOB" data={'02/02/2003'} />
          <AccountRender label="Sex" data={'Male'} />
        </View>
      </View>
      <View>
        <Text style={styles.title}>Setting</Text>
        <View>
          <SettingsField
            icon={notiIcon(vw(7), vw(7), 'white')}
            isNoti={notif.noti}
            label="Noti"
            setNoti={() => setNotif({...notif, noti: !notif.noti})}
          />
          <SettingsField
            icon={settingPassIcon(vw(7), vw(7), 'white')}
            isNoti={notif.privacy}
            label="Privacy"
            setNoti={() => setNotif({...notif, privacy: !notif.privacy})}
          />
          <SettingsField
            icon={aboutUsIcon(vw(7), vw(7), 'white')}
            isNoti={notif.aboutUs}
            label="Noti"
            setNoti={() => setNotif({...notif, aboutUs: !notif.aboutUs})}
          />
        </View>
      </View>
      <View>
        <Text style={styles.title}>Language</Text>
        <View style={styles.accountRender}>
          <View style={{flexDirection: 'row', columnGap: vw(3)}}>
            {settingIcon(vw(7), vw(7))}
            <View>
              <Text style={styles.title}>Language</Text>
              <Text style={styles.title}>English</Text>
            </View>
          </View>
        </View>
        <View style={styles.accountRender}>
          <View style={{flexDirection: 'row', columnGap: vw(3)}}>
            {signOutIcon(vw(7), vw(7))}
            <View>
              <Text style={styles.title}>Sign out</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const SettingsField: React.FC<SettingsFieldProps> = ({
  icon,
  isNoti,
  label,
  setNoti,
}) => {
  return (
    <View style={styles.settingfield}>
      <View style={[rowCenter, {columnGap: vw(3)}]}>
        {icon}
        <Text style={styles.title}>{label}</Text>
      </View>
      <ToggleSwitch
        isOn={isNoti}
        onColor="#34C759"
        offColor="#A09F9F"
        size="small"
        onToggle={setNoti}
      />
    </View>
  );
};

const AccountRender: React.FC<AccountRenderProps> = ({
  data,
  isUser = true,
  label,
}) => {
  return (
    <View style={styles.accountRender}>
      <View style={{flexDirection: 'row', columnGap: vw(3)}}>
        {isUser ? settingUserIcon(vw(7), vw(7)) : settingPassIcon(vw(7), vw(7))}
        <View>
          <Text style={styles.title}>{label}</Text>
          <Text style={styles.title}>{data}</Text>
        </View>
      </View>
      {nextIcon(vw(7), vw(7), 'white')}
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
  accountRender: {
    flexDirection: 'row',
    marginVertical: vh(2),
    justifyContent: 'space-between',
    width: '100%',
  },
  settingfield: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vh(2),
  },
  avatar: {
    width: vw(30),
    height: vw(30),
    borderRadius: 10,
    alignSelf: 'center',
  },
});
