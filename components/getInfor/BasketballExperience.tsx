/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {vh} from '../../services/styleProps';

interface BasketballExperienceProps {
  experience: string;
  onExperienceChange: (value: string) => void;
}

const BasketballExperience: React.FC<BasketballExperienceProps> = ({
  experience,
  onExperienceChange,
}) => {
  const options = ['<1 year', '1-3 years', '>3 years'];

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={styles.option}
          onPress={() => onExperienceChange(option)}>
          <Text style={styles.optionText}>{option}</Text>
          <View
            style={[
              styles.checkbox,
              option === experience && {backgroundColor: '#F87643'},
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BasketballExperience;

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
