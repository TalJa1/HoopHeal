import {Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnboardingComponentProps} from '../../services/typeProps';
import { vh, vw } from '../../services/styleProps';

const OnboardingComponent: React.FC<OnboardingComponentProps> = ({
  description,
  img,
  title,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={img} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </SafeAreaView>
  );
};

export default OnboardingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: vw(100),
    height: vh(50),
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
