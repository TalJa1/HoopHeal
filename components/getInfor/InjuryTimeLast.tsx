/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {vh} from '../../services/styleProps';

interface InjuryTimeLastProps {
  injuryTimeLast: string;
  onInjuryTimeLast: (value: string) => void;
}

const InjuryTimeLast: React.FC<InjuryTimeLastProps> = ({
  injuryTimeLast,
  onInjuryTimeLast,
}) => {
  const options = ['<1 week', '1-4 weeks', '>1 months'];

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={styles.option}
          onPress={() => onInjuryTimeLast(option)}>
          <Text style={styles.optionText}>{option}</Text>
          <View
            style={[
              styles.checkbox,
              option === injuryTimeLast && {backgroundColor: '#F87643'},
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InjuryTimeLast;

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
