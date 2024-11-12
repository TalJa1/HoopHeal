/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { vh } from '../../services/styleProps';

interface HopeForRecoverProps {
  hope: string;
  onHopeChange: (value: string) => void;
}

const HopeForRecover: React.FC<HopeForRecoverProps> = ({
  hope,
  onHopeChange,
}) => {
  const options = ['<1 week', '1-2 weeks', '1-2 months', 'No rush'];

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={styles.option}
          onPress={() => onHopeChange(option)}>
          <Text style={styles.optionText}>{option}</Text>
          <View
            style={[
              styles.checkbox,
              option === hope && {backgroundColor: '#F87643'},
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HopeForRecover;

const styles = StyleSheet.create({
  container: {
    marginTop: vh(2),
    width: '100%',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#8F8F8F',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    height: vh(7),
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F87643',
  },
});
