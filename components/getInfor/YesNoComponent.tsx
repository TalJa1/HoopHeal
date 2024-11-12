import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {YesNoComponentProps} from '../../services/typeProps';
import {vh} from '../../services/styleProps';

const YesNoComponent: React.FC<YesNoComponentProps> = ({
  onValueChange,
  value,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => onValueChange(true)}>
        <Text style={styles.optionText}>Yes</Text>
        <CheckBox
          disabled
          value={value === true}
          onValueChange={() => onValueChange(true)}
          style={styles.checkbox}
          tintColors={{true: '#F87643', false: '#F87643'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => onValueChange(false)}>
        <Text style={styles.optionText}>No</Text>
        <CheckBox
          disabled
          value={value === false}
          onValueChange={() => onValueChange(false)}
          style={styles.checkbox}
          tintColors={{true: '#F87643', false: '#F87643'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default YesNoComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: vh(5),
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
    height: 50,
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
  checkbox: {
    width: 20,
    height: 20,
  },
});
