import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {containerStyle} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {onboardingData} from '../../services/renderData';
import OnboardingComponent from '../../components/onboarding/OnboardingComponent';

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {onboardingData.map((page, index) => (
          <OnboardingComponent
            key={index}
            img={page.img}
            title={page.title}
            description={page.description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: containerStyle,
});
