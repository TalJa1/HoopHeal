/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  containerStyle,
  marginHorizontal,
  rowCenter,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {calendarIcon, cancelIcon, doubleDotsIcon} from '../../assets/svgIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AddScheduleRouteProp} from '../../services/typeProps';

const AddSchedule = () => {
  const route = useRoute<AddScheduleRouteProp>();
  const {date} = route.params;
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const selectedDate = new Date(currentYear, currentMonth, date);
    const dayOfWeek = selectedDate.toLocaleString('en-US', {weekday: 'long'});
    const formattedDateString = `${dayOfWeek}, ${selectedDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${(selectedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${selectedDate.getFullYear()}`;
    setFormattedDate(formattedDateString);
  }, [date]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <Header />
          <View style={[rowCenter, marginHorizontal]}>
            {calendarIcon(vw(5), vw(5), '#6D6E6F')}
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
          <View style={[marginHorizontal]}>
            <Text style={styles.times}>Times</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View
      style={[
        marginHorizontal,
        rowCenter,
        {justifyContent: 'space-between', marginVertical: vh(2)},
      ]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {cancelIcon(30, 30, 'white')}
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Add Schedule</Text>
      {doubleDotsIcon(30, 30, '#F87643')}
    </View>
  );
};

export default AddSchedule;

const styles = StyleSheet.create({
  container: containerStyle,
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dateText: {
    fontSize: 14,
    color: 'white',
    marginVertical: vh(2),
    marginLeft: vw(2),
  },
  times: {
    color: 'white',
    fontSize: 18,
  },
});
