/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {calendarIcon, cancelIcon, doubleDotsIcon} from '../../assets/svgIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AddScheduleRouteProp} from '../../services/typeProps';
import DatePicker from 'react-native-date-picker';
import ModalSelector from 'react-native-modal-selector';
import {activities} from '../../services/renderData';

const AddSchedule = () => {
  const route = useRoute<AddScheduleRouteProp>();
  const {date} = route.params;
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [chosenOptions, setChosenOptions] = useState({
    selectedActivity: '',
    level: '',
    repeat: '',
  });

  // Format the date for display
  React.useEffect(() => {
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

  // Handle time change
  const handleConfirm = (date1: Date) => {
    setShowTimePicker(false);
    setSelectedTime(date1);
  };

  // Format time for display
  const formatTime = (time: Date) => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}        ${strMinutes}        ${ampm}`;
  };

  // Get the time for the row above (minus 1 hour)
  const getAboveTime = () => {
    const newTime = new Date(selectedTime);
    newTime.setHours(selectedTime.getHours() - 1);
    return formatTime(newTime);
  };

  // Get the time for the row below (plus 1 hour)
  const getBelowTime = () => {
    const newTime = new Date(selectedTime);
    newTime.setHours(selectedTime.getHours() + 1);
    return formatTime(newTime);
  };

  let modalRef: ModalSelector<{key: number; label: string}> | null = null;

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

          {/* Time Picker UI */}
          <View style={[marginHorizontal]}>
            <Text style={styles.times}>Times</Text>
          </View>
          <View style={styles.timePickerRowContainer}>
            {/* Above Time */}
            <View style={styles.timeRow}>
              <Text style={styles.timeText1}>{getAboveTime()}</Text>
            </View>

            {/* Center Time (selected time) */}
            <TouchableOpacity
              style={[styles.timeRow, styles.centerRow]}
              onPress={() => setShowTimePicker(true)}>
              <Text style={styles.timeText}>{formatTime(selectedTime)}</Text>
            </TouchableOpacity>

            {/* Below Time */}
            <View style={styles.timeRow}>
              <Text style={styles.timeText1}>{getBelowTime()}</Text>
            </View>
          </View>

          {/* render select box */}
          <View>
            <View style={[marginHorizontal]}>
              <Text style={styles.times}>More</Text>
              <TouchableOpacity
                onPress={() => modalRef && modalRef.open()}
                style={styles.selectStyle}>
                <ModalSelector
                  data={activities}
                  initValue="Choose"
                  onChange={option =>
                    setChosenOptions({
                      ...chosenOptions,
                      selectedActivity: option.label,
                    })
                  }
                  style={styles.modalSelector}
                  selectStyle={styles.selectStyle}
                  selectTextStyle={styles.selectTextStyle}
                  customSelector={
                    <View style={styles.customSelector}>
                      {calendarIcon(vw(5), vw(5), '#6D6E6F')}
                      <Text style={styles.selectedText}>
                        {chosenOptions.selectedActivity || 'Choose'}
                      </Text>
                    </View>
                  }
                  ref={selector => {
                    modalRef = selector;
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <DatePicker
        modal
        date={selectedTime}
        open={showTimePicker}
        onCancel={() => setShowTimePicker(false)}
        onConfirm={handleConfirm}
        mode="time"
      />
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
  timePickerRowContainer: {
    alignItems: 'center',
  },
  timeRow: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  timeText: {
    fontSize: 14,
    color: '#6D6E6F',
    fontWeight: 500,
  },
  timeText1: {
    fontSize: 12,
    color: '#6D6E6F',
  },
  centerRow: {
    borderColor: '#F7F8F8',
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#F87643',
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalSelector: {
    width: '100%',
  },
  selectStyle: {
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
  },
  selectTextStyle: {
    textAlign: 'left',
  },
  customSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    marginLeft: 10,
    color: 'white',
  },
});

export default AddSchedule;
