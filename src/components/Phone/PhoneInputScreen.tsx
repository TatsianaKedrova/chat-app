//imports
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  Animated,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {PhoneInputScreenProps} from '../../types/types';
import ModalCommon from '../../common/ModalCommon';
import CustomButton from '../../common/CustomButton';
import CountryPicker, {
  Country,
  CountryCode,
  CallingCode,
} from 'react-native-country-picker-modal';
import {isValidPhoneNumber} from 'libphonenumber-js';
import { setFormattedPhone } from '../../bll/usersReducer';

//component
const PhoneInputScreen: React.FC<PhoneInputScreenProps> = ({navigation}) => {

  //redux data
  const dispatch = useDispatch();

  //useState
  const [value, setValue] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('EG');
  const [callingCode, setCallingCode] = useState<CallingCode>('20');
  //useRef
  const phoneInput = useRef<TextInput | null>(null);
  const scaleValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const phoneNumberFormatted = value.replace(/[\d]{4}/g, '$&-');
  const formattedVal = `+${callingCode}${value}`;

  const format = `+${callingCode} ${phoneNumberFormatted}`;

  useEffect(() => {
    dispatch(setFormattedPhone(format));
  }, [format]);

  // functions
  //navigation
  const navigateToOTPScreen = useCallback(() => {
    return navigation.navigate('OTPVerification', {
      mobilePhone: format,
    });
  }, [formattedVal]);

  //clear input
  const clearText = useCallback(() => {
    phoneInput.current?.clear();
  }, []);

  //Button "Continue" onPress method
  const handleOnContinue = useCallback(() => {
    const checkIsValid = isValidPhoneNumber(formattedVal);
    const trimmedValue = value.trim();

    if (trimmedValue) {
      if (checkIsValid) {
        navigateToOTPScreen();
        clearText();
      } else {
        setVisible(true);
        handleModalAnimationOpen();
        clearText();
      }
    } else {
      setModalVisible(true);
      handleModalAnimationOpen();
    }
  }, [value]);

  //Opens modal popup
  const handleModalAnimationOpen = useCallback(() => {
    return Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  //Closes modal popup common function
  const handleModalAnimationClose = useCallback(() => {
    clearText();
    return Animated.timing(scaleValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 300,
    }).start();
  }, []);

  //Closes modal popup for invalid numbers
  const handleOnPressOkButton = useCallback(() => {
    setTimeout(() => setVisible(false), 200);
    handleModalAnimationClose();
  }, []);

  //Closes modal popup for empty input
  const handleOnPressOkModalButton = useCallback(() => {
    setTimeout(() => setModalVisible(false), 200);
    handleModalAnimationClose();
  }, []);

  const handleOnChangeText = useCallback(
    text => {
      setValue(text);
    },
    [value],
  );

  const onSelectCountry = useCallback(
    (country: Country) => {
      const {cca2, callingCode} = country;
      setCountryCode(cca2);
      setCallingCode(callingCode[0]);
    },
    [countryCode],
  );

  return (
    <View style={styles.container}>
      <ModalCommon
        visible={visible}
        handleOnPress={handleOnPressOkButton}
        scaleValue={scaleValue}>
        <View>
          <Text style={styles.textModal}>
            The number is invalid! Please try again...
          </Text>
        </View>
      </ModalCommon>
      <ModalCommon
        visible={modalVisible}
        handleOnPress={handleOnPressOkModalButton}
        scaleValue={scaleValue}>
        <View>
          <Text style={styles.textModal}>
            'Please enter your phone number!'
          </Text>
        </View>
      </ModalCommon>
      <KeyboardAvoidingView
        style={styles.containerAvoidingView}
        keyboardVerticalOffset={50}
        behavior="padding">
        <View style={styles.textContainer}>
          <View style={styles.textFirstContainer}>
            <Text style={styles.textFirst}>Enter Your Phone Number</Text>
          </View>
          <View>
            <Text style={styles.textStyle}>
              Please confirm your country code and enter your phone number
            </Text>
          </View>
        </View>

        <View style={styles.phoneInputContainerStyle}>
          <View style={styles.flagAndCodeContainer}>
            <CountryPicker
              countryCode={countryCode}
              withCallingCode
              withEmoji={false}
              onSelect={onSelectCountry}
              containerButtonStyle={styles.flagContainer}
              visible={false}
            />
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCodeText}>{`+${callingCode}`}</Text>
            </View>
          </View>
          <TextInput
            ref={phoneInput}
            style={styles.textInputStyle}
            placeholder={'Phone Number'}
            placeholderTextColor={'#ADB5BD'}
            value={value}
            onChangeText={handleOnChangeText}
            keyboardType={'numeric'}
            autoFocus
          />
        </View>
        <View style={styles.customButton}>
          <CustomButton title={'Continue'} handleOnPress={handleOnContinue} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  countryCodeText: {
    color: '#ADB5BD',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Mulish-Bold',
  },
  flagContainer: {
    width: 24,
    height: 24,
    position: 'relative',
    left: 8,
    padding: 0,
    borderRadius: 6,
    overflow: 'hidden',
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  phoneInputContainerStyle: {
    position: 'absolute',
    top: 250,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 8,
  },
  textContainer: {
    position: 'absolute',
    width: 295,
    height: 86,
    left: 40,
    top: 120,
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFirstContainer: {
    marginBottom: 8,
  },
  textStyle: {
    fontFamily: 'Mulish-Medium',
    padding: 5,
    lineHeight: 25,
    textAlign: 'center',
  },
  textFirst: {
    fontFamily: 'Mulish-Bold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: '#0F1828',
  },
  textModal: {
    fontFamily: 'Mulish-Bold',
    marginBottom: 20,
    color: '#0b409c',
    fontSize: 25,
    lineHeight: 35,
    textAlign: 'center',
  },
  phoneInputContainer: {
    position: 'absolute',
    width: 327,
    height: 70,
    top: 240,
    left: 24,
    borderRadius: 20,
  },
  customButton: {
    position: 'absolute',
    width: '100%',
    top: 370,
  },
  countryCodeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 3,
    width: 30,
    height: 24,
  },
  textInputStyle: {
    position: 'relative',
    backgroundColor: '#F7F7FC',
    borderRadius: 4,
    alignItems: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 8,
    width: 245,
    fontFamily: 'Mulish-Bold',
    color: '#0F1828',
  },
  flagAndCodeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F7F7FC',
    width: 80,
    height: 44,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 4,
  },
});

export default PhoneInputScreen;
