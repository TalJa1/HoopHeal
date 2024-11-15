/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  containerStyle,
  marginHorizontal,
  rowCenter,
  scrollContainer,
  vh,
} from '../../services/styleProps';
import {backArrowIcon, calendarIcon} from '../../assets/svgIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Calendar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <Header />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View
      style={[marginHorizontal, rowCenter, {justifyContent: 'space-between', marginVertical: vh(2)}]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {backArrowIcon(30, 30, 'white')}
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Calender</Text>
      {calendarIcon(30, 30, '#F87643')}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: containerStyle,
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
