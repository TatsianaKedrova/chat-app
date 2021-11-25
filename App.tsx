import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import WalkThroughScreen from './src/components/WalkThroughScreen/WalkThroughScreen';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './src/types/types';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneInputScreen from './src/components/Phone/PhoneInputScreen';
import OTPVerification from './src/components/OTPVerification/OTPVerification';
import ProfileAccountScreen from './src/components/ProfileAccountScreen/ProfileAccountScreen';
import {Provider} from 'react-redux';
import {store} from './src/bll/store';
import ChatsScreenNavigator from './src/components/ChatsScreen/ChatsScreenNavigator';
import {Image} from 'react-native-elements/dist/image/Image';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const {Navigator, Screen} = Stack;

  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} backgroundColor='white' translucent={false}
    />
      <NavigationContainer>
        <Navigator
          initialRouteName="ChatsNavigation"
          screenOptions={{title: ''}}>
          {/* <Screen
            name="Home"
            component={WalkThroughScreen}
            options={{headerShown: false}}
          />
          <Screen name="PhoneInputScreen" component={PhoneInputScreen} options={{
            headerBackImage: () => {
              return (
                <Image source={require('./src/assets/ArrowHeader.png')} style={{width: 24, height: 24}} /> 
              )
            }
          }}/>
          <Screen
            name="OTPVerification"
            component={OTPVerification}
            options={{
              headerBackImage: () => {
                return (
                  <Image
                    source={require('./src/assets/ArrowHeader.png')}
                    style={{width: 24, height: 24}}
                  />
                );
              },
            }}
          /> */}
          {/* <Screen
            name="ProfileAccountScreen"
            component={ProfileAccountScreen}
            options={{
              headerBackImage: () => {
                return (
                  <Image
                    source={require('./src/assets/ArrowHeader.png')}
                    style={{width: 24, height: 24}}
                  />
                );
              },
              headerTitle: 'Your Profile',
              headerTitleStyle: {
                fontFamily: 'Mulish-Bold',
                fontSize: 18,
              },
            }}
          />  */}
          <Screen
            name="ChatsNavigation"
            component={ChatsScreenNavigator}
            options={{headerShown: false}}
          />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
