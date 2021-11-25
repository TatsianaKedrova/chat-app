import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {OTPVerificationPropsType} from '../../types/types';
import ModalCommon from '../../common/ModalCommon';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {
  setIsLoading,
} from '../../bll/authReducer';
import auth from '@react-native-firebase/auth';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

//constant
const PIN_COUNT = 6;
const OTPVerification: React.FC<OTPVerificationPropsType> = ({
  route,
  navigation,
}) => {
  // variables
  const {mobilePhone} = route.params;
  const scaleValue = useRef<Animated.Value>(new Animated.Value(0)).current;

  //redux data
  const isLoading = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoading,
  );
  const dispatch = useDispatch();

  //useState
  const [otp, setOtp] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  const ref = useBlurOnFulfill({value: otp, cellCount: PIN_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });

  useEffect(() => {
    if (otp.length === 6) {
      confirmCode(otp);
    }
  }, [otp]);

  useEffect(() => {
    signInWithPhone();
  }, []);


  // Functions
  const signInWithPhone = useCallback(async () => {
    dispatch(setIsLoading({isLoading: true}));
    try {
      const confirmation = await auth().signInWithPhoneNumber(mobilePhone);
      setConfirm(confirmation);
      dispatch(setIsLoading({isLoading: false}));
      console.log(confirmation);
    } catch (e) {
      console.log('There is some error: ', e);
      dispatch(setIsLoading({isLoading: false}));
    }
  }, [mobilePhone]);

  const confirmCode = useCallback(
    async (code: string) => {
      try {
        const response = await confirm?.confirm(code);
        console.log(response);
        if (response) {
          if (!response.user.displayName) {
            navigation.navigate('ProfileAccountScreen', {
              userPhone: mobilePhone,
            });
          } else {
            navigation.navigate('ChatsNavigation', {userPhone: mobilePhone});
          }
        }
      } catch (e) {
        console.log('Invalid code: ', e);
        setVisible(true);
        handleModalAnimationOpen();
      } finally {
        setOtp('');
      }
    },
    [otp],
  );

  //Functions
  const handleModalAnimationOpen = useCallback(() => {
    return Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  //Closes modal popup common function
  const handleModalAnimationClose = useCallback(() => {
    return Animated.timing(scaleValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, []);

  const handleOnPressOkButton = useCallback(() => {
    setTimeout(() => setVisible(false), 200);
    handleModalAnimationClose();
  }, []);

  const resendCode = useCallback(() => {
    signInWithPhone();
    setOtp('');
  }, []);

  const renderOtpInputs = useCallback(
    ({index, symbol, isFocused}) => {
      if (symbol.length === 0) {
        return (
          <Text
            key={index}
            style={[styles.textInputStyle, isFocused && styles.activeStyle]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        );
      } else {
        return (
          <Text
            key={index}
            style={styles.activeStyle}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        );
      }
    },
    [otp],
  );

  //JSX
  return (
    <SafeAreaView style={styles.container}>
      <ModalCommon
        visible={visible}
        handleOnPress={handleOnPressOkButton}
        scaleValue={scaleValue}>
        <View>
          <Text style={styles.textModal}>
            OTP Code is wrong. Click Resend to get another OTP code
          </Text>
        </View>
      </ModalCommon>
      <View style={styles.textContainer}>
        <Text style={styles.textFirst}>{'Enter Code'}</Text>
        <Text style={styles.textSecond}>
          {`We have sent you an SMS with the code to  ${mobilePhone}`}
        </Text>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#002DE3" />}

      <CodeField
        ref={ref}
        {...props}
        value={otp}
        onChangeText={setOtp}
        cellCount={PIN_COUNT}
        rootStyle={styles.textInputContainer}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderOtpInputs}
      />
      <Pressable style={styles.pressable} onPress={resendCode}>
        <Text style={styles.pressableText}>Resend Code</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    borderRadius: 20,
    width: 24,
    height: 24,
    margin: 15,
    backgroundColor: '#EDEDED',
    color: 'black',
  },
  activeStyle: {
    borderRadius: 40,
    fontFamily: 'Mulish-Bold',
    fontSize: 32,
    lineHeight: 30,
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    margin: 15,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  textContainer: {
    flex: 1,
    marginTop: 45,
    marginBottom: 10,
    marginHorizontal: 40,
  },
  textFirst: {
    fontFamily: 'Mulish-Bold',
    fontSize: 32,
    lineHeight: 30,
    textAlign: 'center',
    color: '#0F1828',
    letterSpacing: 1.5,
  },
  textSecond: {
    fontFamily: 'Mulish-Medium',
    letterSpacing: 0.5,
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    color: '#0F1828',
    textAlign: 'center',
  },
  inputFieldStyle: {
    backgroundColor: '#EDEDED',
    width: 24,
    height: 24,
    margin: 20,
    borderRadius: 20,
    padding: 0,
  },
  highlightedInputFieldStyle: {
    backgroundColor: '#93deff',
  },
  numberInputStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#0F1828',
    borderWidth: 0,
    padding: 5,
    height: 70,
    width: 60,
    textAlign: 'center',
    borderRadius: 70,
  },
  pressable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  pressableText: {
    fontFamily: 'Mulish-Bold',
    color: '#002DE3',
    fontSize: 18,
    letterSpacing: 1.5,
  },
  otp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 10,
    backgroundColor: 'white',
  },
  textModal: {
    fontFamily: 'Mulish-Bold',
    marginBottom: 20,
    color: '#0b409c',
    fontSize: 25,
    lineHeight: 35,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default OTPVerification;
