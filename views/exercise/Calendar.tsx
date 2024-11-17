/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
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
  clockIcon,
  nextCalenderIcon,
  plusIcon,
  threeDotsVerticalIcon,
} from '../../assets/svgIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodayExerciseDataProps} from '../../services/typeProps';

const Calendar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedDate, setSelectedDate] = useState<number | null>(3);
  const [currentDateData, setCurrentDateData] = useState<
    TodayExerciseDataProps[]
  >([]);
  const [selectedItem, setSelectedItem] =
    useState<TodayExerciseDataProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const currentMonth = new Date().toLocaleString('en-US', {month: 'long'});

  const getCurrentDate = () => {
    const today = new Date();
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        day: date.getDate(),
        month: date.getMonth() + 1, // Adding 1 since getMonth() returns 0-11
        year: date.getFullYear(),
        dayOfWeek: date.getDay(),
        isToday: i === 0,
        isPast: i < 0,
      });
    }
    return dates;
  };
  const dates = getCurrentDate();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const todayExer = await AsyncStorage.getItem('todayExercise');
        const data: TodayExerciseDataProps[] = todayExer
          ? JSON.parse(todayExer)
          : [];
        const filteredData = data.filter(
          (item: TodayExerciseDataProps) =>
            item.date ===
            dates[selectedDate!].day + '/' + dates[selectedDate!].month,
        );
        setCurrentDateData(filteredData);
      };

      fetchData();
    }, [dates, selectedDate]),
  );

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
      // Find scheduled items for this hour
      const scheduledItems = currentDateData.filter(item => {
        // Extract hour and adjust for AM/PM manually
        const [time, modifier] = item.time.split(' ');
        const [hours1] = time.split(':').map(Number);

        // Convert to 24-hour format
        const itemTime =
          modifier === 'PM' && hours1 !== 12
            ? hours1 + 12
            : hours1 === 12 && modifier === 'AM'
            ? 0
            : hours1;

        // Compare with the desired hour (i.e., `i`)
        return itemTime === i;
      });

      hours.push(
        <View key={i} style={styles.hourItem}>
          <Text style={styles.hourText}>{formatHour(i)}</Text>
          <View style={styles.scheduleCell}>
            {scheduledItems.map((item, index) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
                key={index}
                style={styles.scheduleItem}>
                <Text style={styles.scheduleTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>,
      );
    }
    return hours;
  };

  const handleAdd = () => {
    if (selectedDate !== null) {
      navigation.navigate('AddSchedule', {
        date: dates[selectedDate].day,
        month: dates[selectedDate].month,
        year: dates[selectedDate].year,
      });
    }
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={[rowCenter, {justifyContent: 'space-between'}]}>
                {threeDotsVerticalIcon(30, 30, 'white')}
                <Text style={styles.headerTitle}>Calendar</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              {selectedItem && (
                <>
                  <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                  <View style={[rowCenter]}>
                    {clockIcon(20, 20, '#8F8F8F')}
                    <Text style={styles.modalTime}>
                      {selectedItem.date}, {selectedItem.time}
                    </Text>
                  </View>
                </>
              )}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.btnDone}>
                <Text style={styles.btnDoneTxt}>Tick list: Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    flexDirection: 'row',
  },
  hourText: {
    fontSize: 16,
    color: 'white',
    marginLeft: vw(5),
    width: '40%',
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
  scheduleCell: {
    flex: 1,
    rowGap: vw(1),
  },
  scheduleItem: {
    backgroundColor: '#F87643',
    alignSelf: 'flex-start',
    borderRadius: vw(50),
    paddingHorizontal: vw(3),
    paddingVertical: vh(0.5),
  },
  scheduleTitle: {
    fontSize: 16,
    color: '#03020B',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    rowGap: vw(2),
    overflow: 'hidden',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 9, // For Android
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  modalTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  btnDone: {
    backgroundColor: '#F87643',
    padding: 10,
    borderRadius: vw(50),
    marginTop: 20,
  },
  btnDoneTxt: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 600,
  },
});
