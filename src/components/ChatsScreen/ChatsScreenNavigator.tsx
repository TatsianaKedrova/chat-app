import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Image,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ChatScreenTypes} from './chatScreenTypes/chatScreenTypes';
import Contacts from './Contacts/Contacts';
import Chats from './Chats/Chats';
import More from './More/More';
import { ChatNavigationStackType } from '../../types/types';

const Tab = createBottomTabNavigator<ChatScreenTypes>();

const ChatsScreenNavigator: React.FC<ChatNavigationStackType> = () => {

  
  const {Navigator, Screen} = Tab;
  return (
    <Navigator
      initialRouteName={'Chats'}
      screenOptions={({route}) => 
      ({  
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Chats') {
            iconName = focused ? (
              <Image
                source={require('../../assets/ChatsIcon.png')}
                style={styles.iconFocused}
              />
            ) : (
              <Image
                source={require('../../assets/message_circle.png')}
                style={styles.iconUnFocused}
              />
            );
          } else if (route.name === 'Contacts') {
            iconName = focused ? (
              <Image
                source={require('../../assets/Menu.png')}
                style={styles.iconFocused}
              />
            ) : (
              <Image
                source={require('../../assets/group.png')}
                style={styles.iconUnFocused}
              />
            );
          } else if (route.name === 'More') {
            iconName = focused ? (
              <Image
                source={require('../../assets/MoreIcon.png')}
                style={styles.iconFocused}
              />
            ) : (
              <Image
                source={require('../../assets/more_horizontal.png')}
                style={styles.iconUnFocused}
              />
            );
          }
          return iconName;
        },
        tabBarShowLabel: false,
      })}>
      <Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerStyle: {
            height: 30,
          },
          headerTitle: 'Contacts',
          headerTitleStyle: {
            fontFamily: 'Mulish-Bold',
            fontSize: 18,
            lineHeight: 30,
            color: '#0F1828',
          },
          headerRight: () => (
            <Image
              source={require('../../assets/crossContacts.png')}
              style={{marginRight: 20}}
            />
          ),
        }}
      />
      <Screen
        name="Chats"
        component={Chats}
        options={{
          headerTitle: 'Chats',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <Pressable
                style={styles.addMessageContainer}
                onPress={() => console.log('Added message')}>
                <Image source={require('../../assets/add_Message.png')} />
              </Pressable>
              <Pressable
                style={styles.addOther}
                onPress={() => console.log('Action with other icon')}>
                <Image source={require('../../assets/add_other.png')} />
              </Pressable>
            </View>
          ),
        }}
      />
      <Screen name="More" component={More} options={() => ({
        headerTitleContainerStyle: {
          backgroundColor: 'pink',
        },
        headerTitleStyle: {
          fontFamily: 'Mulish-Bold',
          fontSize: 18
        },
      })}
    />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  headerButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: 56,
    height: 24,
    marginRight: 24,
    justifyContent: 'space-between',
  },
  headerStyle: {
    height: 30,
  },
  headerTitleStyle: {
    marginBottom: 10,
    fontFamily: 'Mulish-Bold',
    fontSize: 18,
  },
  addMessageContainer: {
    marginRight: 5,
    width: 24,
    height: 24,
  },
  addOther: {
    marginTop: 7,
    width: 24,
    height: 24,
  },
  iconUnFocused: {
    width: 30,
    height: 30,
  },
  iconFocused: {
    width: 58,
    height: 44,
  },
});

export default ChatsScreenNavigator;
