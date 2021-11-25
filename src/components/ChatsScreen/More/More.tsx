import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import {AppRootStateType} from '../../../bll/store';
import {MoreTypeNavigationProp} from '../chatScreenTypes/chatScreenTypes';
import {SignedInUserType} from '../../../bll/authReducer';

const More: React.FC<MoreTypeNavigationProp> = props => {
  const {navigation} = props;

  //state variables
  const formattedPhone = useSelector<AppRootStateType, string>(
    state => state.users.formattedPhone,
  );
  const user = useSelector<AppRootStateType, SignedInUserType | null>(
    state => state.auth.user,
  );

  //functions
  const navigateToProfileScreen = useCallback(() => {
    navigation.navigate('ProfileAccountScreen', {
      userPhone: formattedPhone,
    })
  }, [formattedPhone]);

  //JSX
  return (
    <View style={styles.moreContainer}>
      <Pressable
        style={styles.accountInfo}
        onPress={navigateToProfileScreen}>
        <View style={styles.userInfo}>
          {user?.photoURL ? (
            <Image
              source={{uri: user.photoURL}}
              style={{width: 50, height: 50, borderRadius: 50}}
            />
          ) : (
            <Image
              source={require('../../../assets/AccountIcon.png')}
              style={{width: 50, height: 50}}
            />
          )}

          <View style={styles.userData}>
            <Text style={styles.fullNameStyle}>{user?.displayName}</Text>
            <Text style={styles.phoneNumberStyle}>{formattedPhone}</Text>
          </View>
        </View>
        <Image
          source={require('../../../assets/arrowRight.png')}
          style={{width: 24, height: 24}}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moreContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  accountInfo: {
    flex: 1,
    flexDirection: 'row',
    height: 66,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // backgroundColor: 'pink',
  },
  fullNameStyle: {
    fontFamily: 'Mulish-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#0F1828',
  },
  phoneNumberStyle: {
    fontFamily: 'Mulish-Medium',
    fontSize: 12,
    lineHeight: 20,
    color: '#ADB5BD',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    height: 50,
    width: 210,
    backgroundColor: 'gray',
    marginRight: 84,
    textAlign: 'center',
  },
  userData: {
    flex: 1,
    alignItems: 'flex-start',
    width: 134,
    height: 50,
    marginLeft: 20,
  },
});

export default More;
