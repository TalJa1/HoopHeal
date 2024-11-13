import {TodayExerciseDataProps} from './typeProps';

export const onboardingData = [
  {
    img: require('../assets/onboarding/1.png'),
    title: 'Recover faster',
    description:
      'A personalized training plan for injuries from playing basketball.',
  },
  {
    img: require('../assets/onboarding/2.png'),
    title: 'Track your recovery progress',
    description:
      'A personalized training plan for injuries from playing basketball.',
  },
  {
    img: require('../assets/onboarding/3.png'),
    title: 'Absolute safety for basketball players',
    description:
      'Receive reminders and alerts when unusual signs are detected during training.',
  },
  {
    img: require('../assets/onboarding/4.png'),
    title: 'Detailed, easy-to-follow guidance',
    description: 'Clear video demonstrations of exercises for injury recovery.',
  },
  {
    img: require('../assets/onboarding/5.png'),
    title: 'Professional support after injury',
    description:
      'Get advice from sports recovery experts for basketball-related injuries.',
  },
];

export const userData = [
  {
    email: 'lalabu@gmail.com',
    familyName: 'Bu',
    givenName: 'La La',
    id: '117632206976104712173',
    name: 'La La Bu',
    photo: null,
    age: 22,
    weight: '60',
    height: '180',
    playingTime: '1 - 3 years',
    injury: ['Ankle', 'Shoulder'],
    injuryLast: '1-4 weeks',
    painLevel: 3,
    isMovingDifficult: false,
    hasSameInjuryBefore: true,
    swellingBruising: false,
    medicalTreatment: true,
    hopeforRecovery: '1 - 2 weeks',
    reminderDailyforExerciseat: '7:00 AM',
    adviceFromPro: true,
  },
];

export const TodayExerciseData: TodayExerciseDataProps[] = [
  {
    title: 'Ankle Stretch',
    repeat: '5 min',
    level: 'Easy',
    notify: true,
    time: '7:00 am',
  },
  {
    title: 'Range of Motion',
    repeat: '10 min',
    level: 'Medium',
    notify: false,
    time: '8:30 pm',
  },
];
