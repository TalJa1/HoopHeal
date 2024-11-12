import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {containerStyle} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const fetchData = async () => {
    const data = await AsyncStorage.getItem('listUser');
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>Home</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: containerStyle,
});
