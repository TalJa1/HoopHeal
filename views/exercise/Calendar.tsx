/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  containerStyle,
  marginHorizontal,
  rowCenter,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {
  backArrowIcon,
  backCalenderIcon,
  calendarIcon,
  nextCalenderIcon,
  plusIcon,
} from '../../assets/svgIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Calendar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedDate, setSelectedDate] = useState<number | null>(3);

  const getCurrentDate = () => {
    const today = new Date();
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        day: date.getDate(),
        dayOfWeek: date.getDay(),
        isToday: i === 0,
        isPast: i < 0,
      });
    }
    return dates;
  };

  const dates = getCurrentDate();
  const currentMonth = new Date().toLocaleString('en-US', {month: 'long'});

  const handleDatePress = (index: number) => {
    setSelectedDate(index);
  };

  const dayOfWeekMapping = ['Sun', '2', '3', '4', '5', '6', '7'];

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:00 ${period}`;
  };

  const renderHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(
        <View key={i} style={styles.hourItem}>
          <Text style={styles.hourText}>{formatHour(i)}</Text>
        </View>,
      );
    }
    return hours;
  };

  const handleAdd = () => {
    navigation.navigate('AddSchedule');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView contentContainerStyle={scrollContainer}>
        <View style={{flex: 1}}>
          <Header />
          <View style={styles.dateContainer}>
            {backCalenderIcon(30, 30, 'white')}
            {dates.map((date, index) => {
              const isSelected = selectedDate === index;

              const textStyle = isSelected
                ? styles.selectedText
                : date.isToday
                ? styles.todayText
                : date.isPast
                ? styles.pastText
                : styles.futureText;

              return (
                <TouchableOpacity
                  disabled={date.isPast}
                  key={index}
                  style={[styles.dateItem, isSelected && styles.selectedDate]}
                  onPress={() => handleDatePress(index)}>
                  <Text style={[styles.dateText, textStyle]}>{date.day}</Text>
                  <Text style={[styles.dayText, textStyle]}>
                    {dayOfWeekMapping[date.dayOfWeek]}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {nextCalenderIcon(30, 30, 'white')}
          </View>
          <View style={[rowCenter, styles.monthGrp]}>
            {backCalenderIcon(30, 30, 'white')}
            <Text style={styles.monthText}>{currentMonth}</Text>
            {nextCalenderIcon(30, 30, 'white')}
          </View>
          <View style={styles.hoursContainer}>{renderHours()}</View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleAdd} style={styles.plusBtn}>
        {plusIcon(vw(10), vw(10), '#F87643')}
      </TouchableOpacity>
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
        {backArrowIcon(30, 30, 'white')}
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Calendar</Text>
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: vw(5),
  },
  dateItem: {
    alignItems: 'center',
    padding: vw(2),
    borderRadius: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 12,
  },
  todayDate: {
    color: '#F87643',
  },
  pastDate: {
    color: 'grey',
  },
  futureDate: {
    color: 'black',
  },
  todayText: {
    color: '#F87643',
  },
  pastText: {
    color: 'grey',
  },
  futureText: {
    color: '#FFFFFF',
  },
  selectedDate: {
    backgroundColor: '#F87643',
  },
  selectedText: {
    color: 'black',
  },
  monthGrp: {
    marginTop: vh(1),
    paddingHorizontal: vw(5),
    alignSelf: 'center',
  },
  monthText: {
    color: '#ADA4A5',
    fontSize: 16,
    marginHorizontal: vw(5),
  },
  hoursContainer: {
    marginTop: vh(2),
  },
  hourItem: {
    paddingVertical: vh(1),
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  hourText: {
    fontSize: 16,
    color: 'white',
    marginLeft: vw(5),
  },
  plusBtn: {
    position: 'absolute',
    bottom: vh(5),
    right: vw(5),
    padding: vw(3),
    backgroundColor: '#F87643',
    borderRadius: vw(50),
    opacity: 0.9,
  },
});
