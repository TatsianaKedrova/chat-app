import React, {useMemo} from 'react';
import {StyleSheet, View, Pressable, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {v1} from 'uuid';
import {SignedInUserType} from '../../../bll/authReducer';
import {AppRootStateType} from '../../../bll/store';

export type UserPropsType = {
  text?: string;
  userName: string;
  avatar: string | null;
  userId: string;
  isOnline?: boolean;
  date?: string;
  newMessage?: number;
};

const id = v1();

const UserPhoto: React.FC<UserPropsType> = ({userName, avatar, userId}) => {
  const user = useSelector<AppRootStateType, SignedInUserType | null>(
    state => state.auth.user,
  );
  const storyName = useMemo(
    () =>
      userName
        ? userName.length < 11
          ? userName
          : `${userName.slice(0, 9)}...`
        : null,
    [userName],
  );

  const storyWithoutPhoto = useMemo(
    () =>
      userName.includes(' ')
        ? `${userName.slice(0, 1).toUpperCase()}${userName
            .slice(userName.indexOf(' ') + 1, userName.indexOf(' ') + 2)
            .toUpperCase()}`
        : `${userName?.slice(0, 1).toUpperCase()}${userName
            ?.slice(1, 2)
            .toUpperCase()}`,
    [userName],
  );
  if (userId === user?.uid) {
    return (
      <View key={userId} style={styles.storyStyle}>
        <Pressable style={[styles.pressableStory, {borderColor: '#ADB5BD'}]}>
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
        <View style={styles.storyTextContainer}>
          <Text style={styles.storyName}>Your Story</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View key={id} style={styles.storyStyle}>
        {avatar ? (
          <Pressable style={styles.pressableStory}>
            <Image source={{uri: avatar}} style={styles.storyImage} />
          </Pressable>
        ) : (
          <Pressable style={styles.pressableStory}>
            <View style={styles.defaultStoryTextContainer}>
              <Text style={styles.defaultStoryText}>{storyWithoutPhoto}</Text>
            </View>
          </Pressable>
        )}
        <View style={styles.storyTextContainer}>
          <Text style={styles.storyName}>{storyName}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
  storyName: {
    fontFamily: 'Mulish-Medium',
    fontSize: 10,
    color: '#0F1828',
    lineHeight: 16,
  },
  storyStyle: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: 56,
    height: 76,
    backgroundColor: 'white',
  },
  storyTextContainer: {
    width: 56,
    height: 16,
    textAlign: 'center',
  },
});

export default UserPhoto;
