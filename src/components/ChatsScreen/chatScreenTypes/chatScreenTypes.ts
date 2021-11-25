import { RootStackParamList } from './../../../types/types';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type ChatScreenTypes = {
  Contacts: undefined;
  Chats: undefined;
  More: undefined;
};

export type ChatsType = CompositeScreenProps<
BottomTabScreenProps<ChatScreenTypes, 'Chats'>,
StackScreenProps<RootStackParamList>
>;

export type ContactsType = CompositeScreenProps<
BottomTabScreenProps<ChatScreenTypes, 'Contacts'>,
StackScreenProps<RootStackParamList>
>;

export type MoreTypeNavigationProp = CompositeScreenProps<
  BottomTabScreenProps<ChatScreenTypes, 'More'>,
  StackScreenProps<RootStackParamList>
>;
