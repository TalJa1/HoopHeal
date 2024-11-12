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
