import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import React from 'react';
import {containerStyle} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {onboardingData} from '../../services/renderData';
import OnboardingComponent from '../../components/onboarding/OnboardingComponent';

const {width: screenWidth} = Dimensions.get('window');

const Onboarding = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#F87643'} />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {onboardingData.map((page, index) => (
          <View key={index} style={styles.page}>
            <OnboardingComponent
              img={page.img}
              title={page.title}
              description={page.description}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    ...containerStyle,
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  page: {
    width: screenWidth,
  },
});
