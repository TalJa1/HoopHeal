import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Onboarding</Text>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: containerStyle,
});
