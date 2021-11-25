import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import 'react-native-get-random-values';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import CustomButton from '../../common/CustomButton';
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {ProfileAccountScreenProps} from '../../types/types';
import {AppRootStateType} from '../../bll/store';
import {registerUserTC, SignedInUserType, signInUser} from '../../bll/authReducer';
import auth from '@react-native-firebase/auth';


const ProfileAccountScreen: React.FC<ProfileAccountScreenProps> = ({
  route,
  navigation,
}) => {
  //state variables
  const user = useSelector<AppRootStateType, SignedInUserType | null>(
    state => state.auth.user,
  );
  const dispatch = useDispatch();
  console.log(user);
  

  //variables
  let actionSheet = useRef<ActionSheet | null>(null);
  const formattedUserName = useMemo(
    () => user?.displayName?.slice(0, user.displayName?.indexOf(' ')),
    [user?.displayName],
  );
  const formattedUserSurname = useMemo(
    () => user?.displayName?.slice(user.displayName?.indexOf(' ') + 1),
    [user?.displayName],
  );
  const options = ['Upload Photo from Gallery', 'Take a Photo', 'Cancel'];

  //useState
  const [avatar, setAvatar] = useState<string | null>(
    user?.photoURL ? user.photoURL : null,
  );
  const [name, setName] = useState<string | undefined>(
    user?.displayName ? formattedUserName : '',
  );
  const [surname, setSurName] = useState<string | undefined>(
    user?.displayName ? formattedUserSurname : '',
  );
  const [error, setError] = useState<string | null>(null);
  const {userPhone} = route.params;

  //useEffect
  useEffect(() => {
    if (error) {
      errorMessage();
    }
  }, [error]);

  //functions
  const errorMessage = useCallback(() => {
    return setTimeout(() => {
      setError(null);
    }, 6000);
  }, [error]);

  const enterAccount = useCallback(() => {
    const trimmedName = name?.trim();
    if (trimmedName) {
      const fullName = `${trimmedName} ${surname}`;
      dispatch(registerUserTC({displayName: fullName, photoURL: avatar}));
      navigation.navigate('ChatsNavigation', {userPhone: userPhone});
    } else {
      setError('Please enter your name!');
    }
  }, [name, surname, avatar]);

  const setInputName = useCallback(
    (text: string) => {
      setName(text);
    },
    [name],
  );

  const setInputSurname = useCallback(
    (text: string) => {
      setSurName(text);
    },
    [surname],
  );

  const showActionSheet = useCallback(() => {
    actionSheet.current?.show();
  }, [actionSheet]);

  const takePhotoFromCamera = useCallback(() => {
    ImagePicker.openCamera({
      useFrontCamera: true,
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setAvatar(image.path);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [avatar]);

  const choosePhotoFromGallery = useCallback(() => {
    ImagePicker.openPicker({
      width: 150,
      height: 150,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log(image);
        setAvatar(image.path);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, [avatar]);

  const chooseOption = useCallback((index: number) => {
    if (index === 0) {
      choosePhotoFromGallery();
    } else if (index === 1) {
      takePhotoFromCamera();
    } else {
      return;
    }
  }, []);

  //JSX
  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        {avatar ? (
          <Image source={{uri: avatar}} style={styles.avatarStyle} />
        ) : (
          <Image
            source={require('../../assets/Avatar.png')}
            style={styles.avatarStyle}
          />
        )}
        <TouchableOpacity
          onPress={showActionSheet}
          style={{marginLeft: 75, bottom: 20}}>
          <Image source={require('../../assets/memory.png')} />
        </TouchableOpacity>
      </View>
      {error && (
        <View>
          <Text
            style={{
              color: 'red',
              marginTop: 20,
              marginHorizontal: 35,
              fontFamily: 'Mulish-Bold',
            }}>
            {error}
          </Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          value={name}
          onChangeText={setInputName}
          placeholder={'First Name (Required)'}
          placeholderTextColor={'#ADB5BD'}
          style={styles.inputFieldStyle}
          maxLength={16}
        />

        <TextInput
          value={surname}
          onChangeText={setInputSurname}
          placeholder={'Last Name (Optional)'}
          placeholderTextColor={'#ADB5BD'}
          style={styles.inputFieldStyle}
          maxLength={20}
        />
      </View>

      <ActionSheet
        ref={actionSheet}
        title={'Choose an Option'}
        options={options}
        onPress={chooseOption}
        cancelButtonIndex={2}></ActionSheet>

      <View style={styles.buttonStyle}>
        <CustomButton title={'Save'} handleOnPress={enterAccount} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 46,
  },
  avatarStyle: {
    backgroundColor: '#F7F7FC',
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  iconStyle: {
    zIndex: 1,
    position: 'absolute',
    left: 70,
    top: 80,
    backgroundColor: 'green',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  inputFieldStyle: {
    fontFamily: 'Mulish-Bold',
    height: 50,
    width: 327,
    alignItems: 'center',
    color: '#0F1828',
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: '#F7F7FC',
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonStyle: {
    marginVertical: 50,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});

export default ProfileAccountScreen;
