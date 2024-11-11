import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {containerStyle} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {onboardingData} from '../../services/renderData';
import OnboardingComponent from '../../components/onboarding/OnboardingComponent';
import {nextArrowIcon} from '../../assets/svgIcon';

const {width: screenWidth} = Dimensions.get('window');

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#F87643'} />
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        scrollEnabled={false}
        ref={ref => {
          if (ref) {
            ref.scrollTo({x: currentIndex * screenWidth, animated: true});
          }
        }}>
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
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          {nextArrowIcon(24, 24, '#FFFFFF')}
        </TouchableOpacity>
      </View>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F87643',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8F8F8F',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: '#FFFFFF',
  },
  nextButton: {
    padding: 10,
  },
});
