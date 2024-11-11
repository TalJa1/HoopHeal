import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnboardingComponentProps} from '../../services/typeProps';
import {vh, vw} from '../../services/styleProps';

const OnboardingComponent: React.FC<OnboardingComponentProps> = ({
  description,
  img,
  title,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topImgView}>
        <Image source={img} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </SafeAreaView>
  );
};

export default OnboardingComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  topImgView: {
    backgroundColor: '#F87643',
    height: vh(45),
    width: vw(100),
  },
  image: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: vh(55),
    resizeMode: 'cover',
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
