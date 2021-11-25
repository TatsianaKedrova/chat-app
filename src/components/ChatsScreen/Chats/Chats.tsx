import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Alert,
  FlatList,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import {AppRootStateType} from '../../../bll/store';
import {ChatsType} from '../chatScreenTypes/chatScreenTypes';
import {SignedInUserType, signInUser} from '../../../bll/authReducer';
import auth from '@react-native-firebase/auth';
import {getUsersFromDB, UserType} from '../../../bll/usersReducer';
import UserPhoto from './UserPhoto';
import FlatListItemSeparator from './FlatListItemSeparator';
import MessagesList from './MessagesList';


const Chats: React.FC<ChatsType> = () => {
  //state values
  const user = useSelector<AppRootStateType, SignedInUserType | null>(
    state => state.auth.user,
  );
  const users = useSelector<AppRootStateType, UserType[]>(
    state => state.users.users,
  );
  const dispatch = useDispatch();

  console.log('user: ', user);

  //useEffect
  useEffect(() => {
    console.log('I am in authorization useEffect!!!');

    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        const {phoneNumber, uid, displayName, photoURL} = user;
        await dispatch(signInUser({phoneNumber, uid, displayName, photoURL}));
      } else {
        console.log('Something went wrong! There is no user!');
        Alert.alert('Something went wrong! There is no user!');
      }

      return () => {
        subscriber();
      };
    });
  }, []);

  useEffect(() => {
    console.log('I am in useeffect');
    dispatch(getUsersFromDB());
  }, []);

  //functions
  const renderItem = useCallback(
    ({item}) => (
      <UserPhoto
        avatar={item.avatar}
        userName={item.fullname}
        userId={item.userId}
      />
    ),
    [users],
  );

  const renderMessagesList = useCallback(
    ({item}) => (
      <MessagesList
        avatar={item.avatar}
        dateOfSendingMessage={''}
        userId={item.userId}
        userName={item.fullname}
        messages={[]}
        isOnline={false}
        unreadMessages={0}
      />
    ),
    [users],
  );

  const moveUserToBeginning = useCallback(
    (users: UserType[]) => {
      const index = users.findIndex(element => element.userId === user?.uid)
      let element = users[index];
      const copyArr = [...users];
      copyArr.splice(index, 1);
      copyArr.splice(0, 0, element);
      if (copyArr.length > 1) {
        return copyArr;
      } else {
        return;
      }
    },
    [users],
  );

  console.log('users: ', users);
  console.log('copy of users: ', moveUserToBeginning(users));

  return (
    <View style={styles.chatsScreenContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <View style={styles.storiesContainer}>
        <FlatList
          data={moveUserToBeginning(users)}
          horizontal
          ItemSeparatorComponent={() => <FlatListItemSeparator />}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.searchAndMessagesContainer}>
        <TextInput
          style={styles.textInputStyle}
          placeholder={'Placeholder'}
          inlineImageLeft="search_icon"
          inlineImagePadding={12}
          placeholderTextColor={'#ADB5BD'}
        />
        <View>
          <FlatList
            data={users}
            renderItem={renderMessagesList}
            keyExtractor={item => item.userId}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View>
          <Text>No Messages yet</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatsScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  storiesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomColor: '#EDEDED',
    borderBottomWidth: 1,
  },
  searchAndMessagesContainer: {
    flex: 6,
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 24,
    height: 284,
  },
  textInputStyle: {
    backgroundColor: '#F7F7FC',
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

export default Chats;
