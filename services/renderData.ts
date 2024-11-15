import {TodayExerciseDataProps, WorkoutProps} from './typeProps';

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
    time: '7:00 AM',
    img: require('../assets/home/exer1.png'),
    date: '24/09',
  },
  {
    title: 'Range of Motion',
    repeat: '10 min',
    level: 'Medium',
    notify: false,
    time: '8:30 PM',
    img: require('../assets/home/exer1.png'),
    date: '24/09',
  },
];

export const CommonInjuriesData = [
  {
    label: 'Ankle Sprain',
    img: require('../assets/home/inj1.png'),
  },
  {
    label: 'ACL Tear',
    img: require('../assets/home/inj2.png'),
  },
  {
    label: 'Patellar Tendonitis',
    img: require('../assets/home/inj3.png'),
  },
  {
    label: 'Achilles Tendonitis',
    img: require('../assets/home/inj4.png'),
  },
];

export const UserTmp = {
  email: 'wozsnshesp@sina.com',
  familyName: 'Bu',
  givenName: 'La La',
  id: '1176322069761047123123',
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
};

export const CommonInjuriesExerciseData = [
  {
    label: 'Ankle Sprain',
    description: 'Common ankle twist or roll causing ligament strain',
  },
  {
    label: 'ACL Tear',
    description: 'Anterior cruciate ligament tear in the knee',
  },
  {
    label: 'Patellar Tendonitis',
    description: 'Inflammation of the patellar tendon in the knee',
  },
  {
    label: 'Achilles Tendonitis',
    description: 'Inflammation of the Achilles tendon in the heel',
  },
  {
    label: 'Hamstring Strain',
    description: 'Tear or strain in the hamstring muscles',
  },
  {
    label: 'Shin Splints',
    description: 'Pain along the shin bone caused by overuse',
  },
];

export const workoutData: WorkoutProps[] = [
  {
    title: 'Towel stretch',
    times: 3,
    img: require('../assets/exercise/w1.png'),
    description:
      'The towel stretch is a simple yet effective stretch that utilizes a towel to help extend your range of motion and improve flexibility, especially in the hamstrings and lower back. Regular practice can reduce muscle tightness and improve overall mobility in your legs and back.',
    howTodo: [
      'Sit comfortably on the floor with your legs extended straight in front of you and your back upright. Wrap a towel around the ball of one foot, holding each end firmly with both hands.',
      'Begin to pull the towel toward your torso slowly, ensuring your knee stays straight without locking it.',
      'Hold the position for 30 seconds while breathing deeply and focusing on relaxing the muscles being stretched. This allows the stretch to penetrate deeper into the muscle fibers.',
      'Repeat on the other side, aiming to increase flexibility gradually over time by stretching a little further each session.',
    ],
  },
  {
    title: 'Standing calf stretch',
    times: 3,
    img: require('../assets/exercise/w2.png'),

    description:
      'The standing calf stretch targets the calf muscles and helps improve flexibility and relieve tension in the lower legs. This stretch is beneficial for runners, walkers, and anyone who stands or moves a lot throughout the day.',
    howTodo: [
      'Face a wall and place both hands on it at shoulder height. Step back with one foot, keeping it straight and pressing your heel firmly into the ground.',
      'Bend your front knee gently, shifting your weight forward, but keep the back leg straight to maintain the stretch in your calf. Focus on pushing through the heel.',
      'Hold this position for 30 seconds, breathing deeply, and aim to feel the stretch extend through the back of the leg and into the Achilles tendon.',
      'Switch legs, repeating on the other side, and adjust your stance if needed to increase the stretch. This exercise can be performed daily for best results.',
    ],
  },
  {
    title: 'Achilles soleus stretch',
    times: 3,
    img: require('../assets/exercise/w3.png'),

    description:
      'The Achilles soleus stretch focuses on the lower calf and Achilles tendon, areas crucial for lower body flexibility and resilience, particularly in athletic activities like running and jumping. This stretch helps maintain the health of the Achilles tendon, preventing stiffness and injuries.',
    howTodo: [
      'Stand in front of a wall with both hands on the wall at shoulder height. Step one foot back and bend both knees slightly.',
      'Press the back heel firmly into the ground, feeling the stretch through the Achilles tendon and lower calf, ensuring that you’re not overextending.',
      'Hold this position for about 30 seconds, breathing slowly and deeply to allow the muscle to relax and stretch further.',
      'Repeat on the opposite side, and remember to stretch both legs equally. Perform this stretch after exercises or physical activity for optimal benefit.',
    ],
  },
  {
    title: 'Toe circles',
    times: 3,
    img: require('../assets/exercise/w4.png'),

    description:
      'Toe circles are a gentle but effective exercise that strengthens the toes and ankles while improving joint mobility. This exercise is especially useful for those recovering from foot injuries or looking to increase the range of motion in their lower legs and feet.',
    howTodo: [
      'Sit in a comfortable chair with your feet flat on the floor. Lift one foot off the ground, extending your leg slightly.',
      'Begin rotating your toes in a circular motion, aiming for a controlled and steady pace to work the muscles effectively. Draw 10 circles in one direction, then switch and draw 10 in the other direction.',
      'Focus on moving from the ankle rather than just wiggling your toes, allowing the entire foot to participate in the motion.',
      'Switch to the other foot, repeating the same motion. Aim for several sets on each foot for improved flexibility and strength in the ankles and toes.',
    ],
  },
  {
    title: 'Alphabet exercise',
    times: 3,
    img: require('../assets/exercise/w1.png'),

    description:
      'The alphabet exercise is a unique and engaging way to improve ankle flexibility and strength by “writing” letters with your toes. This exercise challenges the small muscles in your feet and lower legs, promoting stability and coordination, which are essential for maintaining balance.',
    howTodo: [
      'Sit on a sturdy chair with your feet resting comfortably on the floor. Lift one foot slightly off the ground, keeping your leg steady.',
      'Using your toes as a “pen,” begin to trace out each letter of the alphabet in the air, making each letter large and distinct. Focus on moving from the ankle to engage the entire foot.',
      'Take your time, working through each letter from A to Z, ensuring you’re engaging the muscles without causing strain.',
      'Switch to the other foot and repeat. This exercise can be performed daily and is especially beneficial for improving coordination in the ankles.',
    ],
  },
];
