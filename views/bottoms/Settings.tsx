import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {containerStyle, scrollContainer} from '../../services/styleProps';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={scrollContainer}>
        <View>
          <Text>Settings</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: containerStyle,
});
