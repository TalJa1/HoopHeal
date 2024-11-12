import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface VerticalNumberPickerProps {
  min: number;
  max: number;
  value: number;
  onValueChange: (value: number) => void;
}

const ITEM_HEIGHT = 60;

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
    height: ITEM_HEIGHT * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#F87643',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 24,
    color: '#BABABA',
  },
  selectedItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VerticalNumberPicker;
