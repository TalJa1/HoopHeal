import {RouteProp} from '@react-navigation/native';

export interface OnboardingComponentProps {
  img: any;
  title: string;
  description: string;
}

export interface LoginButtonTypeProps {
  image: any;
  title: string;
}

export interface ggUserProps {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

export interface UserProps {
  email: string;
  familyName: string;
  givenName: string;
  id: string | null;
  name: string;
  photo: string | null;
  age: number;
  weight: string;
  height: string;
  playingTime: string;
  injury: Array<string>;
  injuryLast: string;
  painLevel: number;
  isMovingDifficult: boolean;
  hasSameInjuryBefore: boolean;
  swellingBruising: boolean;
  medicalTreatment: boolean;
  hopeforRecovery: string;
  reminderDailyforExerciseat: string;
  adviceFromPro: boolean;
}

export interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  onTogglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
}

export interface ProgressContentProps {
  progressState: number;
  userInfo: any;
  setUserInfo: (info: any) => void;
}

export interface YesNoComponentProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export interface ProgressRightComponentProps {
  label: string;
  description: string;
}

export interface TodayExerciseDataProps {
  title: string;
  repeat: string;
  level: string;
  time: string;
  notify: boolean;
  img: any;
  date: string;
}

export interface SettingsProps {
  data: UserProps | null;
}

export interface AccountRenderProps {
  label: string;
  isUser?: boolean;
  data: string;
}

export interface SettingsFieldProps {
  label: string;
  icon: any;
  isNoti: boolean;
  setNoti: () => void;
}

type RootStackParamList = {
  ExerciseDetail: {index: number};
};

export type ExerciseDetailRouteProp = RouteProp<
  RootStackParamList,
  'ExerciseDetail'
>;

export interface ExerciseItemProps {
  label: string;
  icon: any;
  renerData: string;
}

export interface WorkoutProps {
  title: string; // Towel stretch, Standing calf stretch,Achilles soleus stretch,Toe circles,Alphabet exercise
  times: number;
  img: any;
  description: string;
  howTodo: Array<string>; // 4 steps
}
