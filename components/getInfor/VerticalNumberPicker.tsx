import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {vw} from '../../services/styleProps';

interface VerticalNumberPickerProps {
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
}

const VerticalNumberPicker: React.FC<VerticalNumberPickerProps> = ({
  min,
  max,
  value,
  onValueChange,
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (currentValue !== value) {
      onValueChange(currentValue);
    }
  }, [currentValue, onValueChange, value]);

  const handleSelect = (newValue: number) => {
    if (newValue >= min && newValue <= max) {
      setCurrentValue(newValue);
    }
  };

  const data = [
    currentValue - 1 >= min ? currentValue - 1 : null,
    currentValue,
    currentValue + 1 <= max ? currentValue + 1 : null,
  ].filter(item => item !== null) as number[];

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, item === currentValue && styles.selectedItem]}
          onPress={() => handleSelect(item)}>
          <Text
            style={[
              styles.itemText,
              item === currentValue && styles.selectedItemText,
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#F87643',
    borderRadius: 10,
    padding: vw(4),
    borderWidth: 4,
    borderColor: '#2C3522',
  },
  itemText: {
    fontSize: 60,
    color: '#BABABA',
  },
  selectedItemText: {
    color: 'black',
    fontSize: 128,
    fontWeight: 'bold',
  },
});

export default VerticalNumberPicker;
