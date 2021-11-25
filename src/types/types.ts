import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  PhoneInputScreen: undefined;
  OTPVerification: {
    mobilePhone: string;
  };
  ProfileAccountScreen: {
    userPhone: string;
  } ;
  ChatsNavigation: {
    userPhone: string;
  };
};

export type PhoneInputScreenProps = StackScreenProps<
  RootStackParamList,
  'PhoneInputScreen'
>;

export type OTPVerificationPropsType = StackScreenProps<
  RootStackParamList,
  'OTPVerification'
>;

export type ProfileAccountScreenProps = StackScreenProps<
  RootStackParamList,
  'ProfileAccountScreen'
>;

export type ChatNavigationStackType = StackScreenProps<
  RootStackParamList,
  'ChatsNavigation'
>;
