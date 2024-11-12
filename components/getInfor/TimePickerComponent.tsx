import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';

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

  return (
    <View>
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={() => setOpen(true)}>
        <Text style={styles.input}>{time || 'Select Time'}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="time"
        open={open}
        date={selectedTime}
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
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
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
});
