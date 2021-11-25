import React from 'react';
import {Pressable, Image, View, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { SignedInUserType } from '../../../bll/authReducer';
import { AppRootStateType } from '../../../bll/store';


export type MessagesListType = {
  userId: string;
  avatar: string | null;
  userName: string;
  isOnline: boolean;
  messages: string[];
  dateOfSendingMessage: string;
  unreadMessages: number

};

const MessagesList: React.FC<MessagesListType> = ({userId, avatar}) => {
  const user = useSelector<AppRootStateType, SignedInUserType | null>(
    state => state.auth.user,
  );
  if(userId === user?.uid) {
    return <Pressable style={[styles.pressableStory, {borderColor: '#ADB5BD'}]}>
    <View
      style={[
        styles.defaultStoryTextContainer,
        {backgroundColor: '#F7F7FC', flex: 1, justifyContent: 'center'},
      ]}>
      <Image
        source={require('../../../assets/your_story.png')}
        style={{margin: 15}}
      />
    </View>
  </Pressable>
  }
  return (
    <Pressable key={userId} style={styles.messageContainer}>
      <View style={styles.imageContainer}>
        {avatar ? (
          <Pressable>
            <Image source={{uri: avatar}} style={styles.storyImage} />
          </Pressable>
        ) : (
          <Pressable>
            <View style={styles.defaultStoryTextContainer}></View>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultStoryTextContainer: {
    backgroundColor: '#166FF6',
    width: 46,
    height: 46,
    paddingVertical: 10,
    borderRadius: 16,
  },
  imageContainer: {
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    backgroundColor: 'pink',
    marginVertical: 16,
  },
  pressableStory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    borderRadius: 16,
    borderColor: '#166FF6',
    borderWidth: 3,
    marginBottom: 5,
  },
  storyImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    width: 46,
    height: 46,
  },
});

export default MessagesList;
