import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface HeightWeightInputProps {
  weight: number;
  height: string;
  onWeightChange: (value: number) => void;
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
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={weight.toString() ?? ''}
          onChangeText={value => onWeightChange(Number(value))}
          keyboardType="numeric"
          placeholder="Fill"
        />
        <Text style={styles.unit}>KG</Text>
      </View>
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
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#8F8F8F',
  },
  unit: {
    fontSize: 16,
    color: '#8F8F8F',
  },
});
