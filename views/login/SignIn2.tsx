/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';

const SignIn2 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <Text>SignIn2</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn2;

const styles = StyleSheet.create({
  container: containerStyle,
});
