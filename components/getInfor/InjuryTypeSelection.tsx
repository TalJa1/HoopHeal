import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {vh} from '../../services/styleProps';

interface InjuryTypeSelectionProps {
  selectedInjuries: string[];
  onInjuryChange: (selected: string[]) => void;
}

const InjuryTypeSelection: React.FC<InjuryTypeSelectionProps> = ({
  selectedInjuries,
  onInjuryChange,
}) => {
  const options = [
    'Ankle Sprain',
    'Achilles',
    'Knee',
    'Shoulder',
    'Wrist',
    'Other',
  ];

  const handleSelect = (option: string) => {
    if (selectedInjuries.includes(option)) {
      const newSelectedInjuries = selectedInjuries.filter(
        item => item !== option,
      );
      onInjuryChange(newSelectedInjuries);
    } else {
      const newSelectedInjuries = [...selectedInjuries, option];
      onInjuryChange(newSelectedInjuries);
    }
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={styles.option}
          onPress={() => handleSelect(option)}>
          <Text style={styles.optionText}>{option}</Text>
          <CheckBox
            value={selectedInjuries.includes(option)}
            onValueChange={() => handleSelect(option)}
            style={styles.checkbox}
            tintColors={{true: '#F87643', false: '#F87643'}}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InjuryTypeSelection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: vh(2),
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
    color: '#FFFFFF',
  },
  checkbox: {
    width: 20,
    height: 20,
  },
});
