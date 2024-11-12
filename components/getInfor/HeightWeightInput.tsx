import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {vh} from '../../services/styleProps';

interface HeightWeightInputProps {
  weight: number;
  height: string;
  onWeightChange: (value: string) => void;
  onHeightChange: (value: string) => void;
}

const HeightWeightInput: React.FC<HeightWeightInputProps> = ({
  weight,
  height,
  onWeightChange,
  onHeightChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Weight</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={weight.toString() ?? ''}
          onChangeText={onWeightChange}
          keyboardType="numeric"
          placeholder="Fill"
        />
        <Text style={styles.unit}>KG</Text>
      </View>
      <Text style={styles.label}>Height</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={onHeightChange}
          keyboardType="numeric"
          placeholder="Fill"
        />
        <Text style={styles.unit}>CM</Text>
      </View>
    </View>
  );
};

export default HeightWeightInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: vh(7),
    fontSize: 16,
    color: '#8F8F8F',
  },
  unit: {
    fontSize: 16,
    color: '#8F8F8F',
  },
  label: {
    color: '#F87643',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: vh(3),
  },
});
