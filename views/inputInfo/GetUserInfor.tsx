/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle} from '../../services/styleProps';
import {useRoute} from '@react-navigation/native';
import {ggUserProps} from '../../services/typeProps';

const GetUserInfor = () => {
  const route = useRoute();
  const {userData} = route.params as {userData: ggUserProps};
  console.log('userData', userData);

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
