import React, {useState, useRef, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

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
  const flatListRef = useRef<FlatList<number>>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: 1, animated: true});
    }
  }, []);

  useEffect(() => {
    onValueChange(currentValue);
  }, [currentValue, onValueChange]);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const newValue = currentValue + (index - 1);
    if (newValue >= min && newValue <= max) {
      setCurrentValue(newValue);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({index: 1, animated: false});
      }
    }
  };

  const data = [
    currentValue - 1 >= min ? currentValue - 1 : null,
    currentValue,
    currentValue + 1 <= max ? currentValue + 1 : null,
  ].filter(item => item !== null) as number[];

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={item => item.toString()}
      renderItem={({item}) => (
        <View
          style={[styles.item, item === currentValue && styles.selectedItem]}>
          <Text
            style={[
              styles.itemText,
              item === currentValue && styles.selectedItemText,
            ]}>
            {item}
          </Text>
        </View>
      )}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      showsVerticalScrollIndicator={false}
      snapToInterval={ITEM_HEIGHT}
      decelerationRate="fast"
      onMomentumScrollEnd={handleScroll}
    />
  );
};

const styles = StyleSheet.create({
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
