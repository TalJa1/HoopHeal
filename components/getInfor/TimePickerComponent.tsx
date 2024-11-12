import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {vh} from '../../services/styleProps';

interface TimePickerComponentProps {
  time: string;
  onTimeChange: (time: string) => void;
}

const TimePickerComponent: React.FC<TimePickerComponentProps> = ({
  time,
  onTimeChange,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  useEffect(() => {
    if (time) {
      const [hours, minutes] = time.split(':');
      if (hours && minutes) {
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        setSelectedTime(date);
      }
    }
  }, [time]);

  const handleConfirm = (date: Date) => {
    setOpen(false);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${
      minutes < 10 ? '0' : ''
    }${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    setSelectedTime(date);
    onTimeChange(formattedTime);
  };

  const splitTime = (time1: string) => {
    const [timePart, period] = time1.split(' ');
    return {timePart, period};
  };

  const {timePart, period} = splitTime(time || '12:00 AM');

  return (
    <View>
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={() => setOpen(true)}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{timePart}</Text>
          <Text style={styles.periodText}>{period}</Text>
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={selectedTime}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        mode="time"
      />
    </View>
  );
};

export default TimePickerComponent;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: vh(7),
    width: '100%',
    marginVertical: vh(2),
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  periodText: {
    fontSize: 16,
    color: 'white',
  },
});
