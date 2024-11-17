/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Alert,
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
import {
  activityIcon,
  calendarIcon,
  cancelIcon,
  doubleDotsIcon,
  level1Icon,
  nextIcon,
  repeatIcon,
} from '../../assets/svgIcon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  AddScheduleRouteProp,
  SelectOptionProps,
  stateSelectOptionProps,
} from '../../services/typeProps';
import DatePicker from 'react-native-date-picker';
import ModalSelector from 'react-native-modal-selector';
import {activities, level, repeat} from '../../services/renderData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddSchedule = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<AddScheduleRouteProp>();
  const {date, month, year} = route.params;
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [chosenOptions, setChosenOptions] = useState<stateSelectOptionProps>({
    selectedActivity: '',
    level: '',
    repeat: '',
  });

  // Format the date for display
  React.useEffect(() => {
    const selectedDate = new Date(year, month, date);
    const dayOfWeek = selectedDate.toLocaleString('en-US', {weekday: 'long'});
    const formattedDateString = `${dayOfWeek}, ${selectedDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${(selectedDate.getMonth())
      .toString()
      .padStart(2, '0')}/${selectedDate.getFullYear()}`;
    setFormattedDate(formattedDateString);
  }, [date, month, year]);

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

  let modalRef1: ModalSelector<{key: number; label: string}> | null = null;
  let modalRef2: ModalSelector<{key: number; label: string}> | null = null;
  let modalRef3: ModalSelector<{key: number; label: string}> | null = null;

  const handelChangeActivity = (option: {key: number; label: string}) => {
    setChosenOptions({
      ...chosenOptions,
      selectedActivity: option.label,
    });
  };

  const handelChangeLevel = (option: {key: number; label: string}) => {
    setChosenOptions({
      ...chosenOptions,
      level: option.label,
    });
  };

  const handelChangeRepeat = (option: {key: number; label: string}) => {
    setChosenOptions({
      ...chosenOptions,
      repeat: option.label,
    });
  };

  const handleSave = async () => {
    // Helper function to format the date as dd/MM
    const formatDate = (date1: Date) => {
      const day = date1.getDate().toString().padStart(2, '0');
      const month1 = (date1.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month1}`;
    };

    // Helper function to format the time as HH:MM AM/PM
    const formatTime1 = (time: Date) => {
      let hours = time.getHours();
      const minutes = time.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${hours}:${strMinutes} ${ampm}`;
    };

    const newExercise = {
      title: chosenOptions.selectedActivity,
      repeat: chosenOptions.repeat,
      level: chosenOptions.level,
      notify: false,
      time: formatTime1(selectedTime),
      img: null,
      date: formatDate(new Date()), // Use the helper function to format the date
    };

    const tmpData = await AsyncStorage.getItem('todayExercise');
    const todayExercise = tmpData ? JSON.parse(tmpData) : [];
    todayExercise.push(newExercise);
    await AsyncStorage.setItem('todayExercise', JSON.stringify(todayExercise));

    Alert.alert('Success', 'Exercise added successfully', [
      {
        text: 'OK',
        onPress: () => {
          // Navigate back to the previous screen
          navigation.goBack();
        },
      },
    ]);
  };

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
              <View style={{marginVertical: vh(2), rowGap: vh(1.5)}}>
                <SelectOptionView
                  icon={activityIcon(vw(5), vw(5), '#6D6E6F')}
                  label="Choose"
                  ref={modalRef1}
                  setValue={handelChangeActivity}
                  value={chosenOptions.selectedActivity}
                  data={activities}
                />
                <SelectOptionView
                  icon={level1Icon(vw(5), vw(5), '#6D6E6F')}
                  label="Level"
                  ref={modalRef2}
                  setValue={handelChangeLevel}
                  value={chosenOptions.level}
                  data={level}
                />
                <SelectOptionView
                  icon={repeatIcon(vw(5), vw(5), '#6D6E6F')}
                  label="Repeat"
                  ref={modalRef3}
                  setValue={handelChangeRepeat}
                  value={chosenOptions.repeat}
                  data={repeat}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
            <Text style={styles.saveBtnTxt}>Save</Text>
          </TouchableOpacity>
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

const SelectOptionView: React.FC<SelectOptionProps> = ({
  icon,
  label,
  ref,
  setValue,
  value,
  data,
}) => {
  return (
    <TouchableOpacity
      onPress={() => ref && ref.open()}
      style={styles.selectStyle}>
      <ModalSelector
        data={data}
        initValue={label}
        onChange={setValue}
        style={styles.modalSelector}
        selectStyle={styles.selectStyle}
        selectTextStyle={styles.selectTextStyle}
        customSelector={
          <View style={styles.customSelector}>
            <View style={[rowCenter]}>
              {icon}
              <Text style={styles.selectedText}>{label}</Text>
            </View>
            <View style={[rowCenter]}>
              <Text style={[styles.selectedText, {color: '#A09F9F'}]}>
                {value || ''}
              </Text>
              {nextIcon(vw(7), vw(7), '#A09F9F')}
            </View>
          </View>
        }
        ref={selector => {
          ref = selector;
        }}
      />
    </TouchableOpacity>
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
    borderRadius: 20,
    borderColor: '#6D6E6F',
    borderWidth: 1,
    padding: 10,
  },
  selectTextStyle: {
    textAlign: 'left',
  },
  customSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    marginLeft: 10,
    color: '#6D6E6F',
  },
  saveBtn: {
    backgroundColor: '#F87643',
    borderRadius: vw(50),
    padding: 15,
    marginVertical: vh(2),
    alignItems: 'center',
    alignSelf: 'center',
    width: vw(70),
  },
  saveBtnTxt: {
    color: 'black',
    fontSize: 18,
  },
});

export default AddSchedule;
