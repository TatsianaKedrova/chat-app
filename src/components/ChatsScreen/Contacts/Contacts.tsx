import React, {useMemo, useEffect, useCallback} from 'react';
import {Text, Pressable, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, TextInput, View} from 'react-native';
import {getUsersFromDB, UserType} from '../../../bll/usersReducer';
import {ContactsType} from '../chatScreenTypes/chatScreenTypes';
import {AppRootStateType} from '../../../bll/store';


const Contacts: React.FC<ContactsType> = () => {
  const users = useSelector<AppRootStateType, UserType[]>(
    state => state.users.users,
  );
  const isOnline = useSelector<AppRootStateType, boolean>(
    state => state.users.isOnline,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersFromDB());
    console.log(users);
   }, [])

  const usersList = users.map((user) => {
    const storyWithoutPhoto = useMemo(
      () =>
        user.fullname.includes(' ')
          ? `${user.fullname.slice(0, 1)}${user.fullname.slice(
              user.fullname.indexOf(' ') + 1,
              user.fullname.indexOf(' ') + 2,

            )}`
          : `${user.fullname?.slice(0, 1)}${user.fullname
              ?.slice(1, 2)
              .toUpperCase()}`,
      [user.fullname],
    );
    return (
      <View style={styles.mainContactContainer} key={user.userId}>
        <Pressable style={styles.contactStyle}>
          <View style={styles.contactAvatar}>
            {user.avatar ? (
              <Image source={{uri: user.avatar}} style={styles.storyImage} />
            ) : (
              <View style={styles.pressableStory}>
                <View style={styles.defaultStoryTextContainer}>
                  <Text style={styles.defaultStoryText}>
                    {storyWithoutPhoto}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.fullNameStyle}>{user.fullname}</Text>
            <Text style={styles.isOnlineStyle}>{user.phoneNumber}</Text>
          </View>
        </Pressable>
      </View>
    );
  });

  return (
    <View style={styles.contactsContainer}>
      <View style={styles.contactsBlock}>
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Search'}
          inlineImageLeft="search_icon"
          inlineImagePadding={12}
          placeholderTextColor={'#ADB5BD'}
        />
        {usersList}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactsContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contactAvatar: {
    // flex: 1,
    marginRight: 12,
    // backgroundColor: 'pink',
    height: 56,
  },
  contactsBlock: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
  contactInfo: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  contactStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 56,
    marginBottom: 12,
    // backgroundColor: "blue"
  },
  defaultStoryText: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  defaultStoryTextContainer: {
    backgroundColor: '#166FF6',
    width: 46,
    height: 46,
    paddingVertical: 10,
    borderRadius: 16,
  },
  fullNameStyle: {
    fontFamily: 'Mulish-Bold',
    fontSize: 14,
    lineHeight: 24,
    color: '#0F1828',
  },
  isOnlineStyle: {
    fontFamily: 'Mulish-Medium',
    fontSize: 12,
    lineHeight: 20,
    color: '#ADB5BD',
  },
  mainContactContainer: {
    marginTop: 16,
    height: 68,
    borderBottomWidth: 3,
    borderBottomColor: '#EDEDED',
  },
  pressableStory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 16,
    marginBottom: 5,
  },
  storyImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    width: 46,
    height: 46,
    margin: 4,
  },
  textInputStyle: {
    backgroundColor: '#F7F7FC',
    marginTop: 29,
    paddingHorizontal: 8,
    paddingVertical: 6,
    width: 327,
    borderRadius: 4,
    fontFamily: 'Mulish-Bold',
    fontSize: 14,
    lineHeight: 24,
    color: '#0F1828',
  },
});

export default Contacts;


 