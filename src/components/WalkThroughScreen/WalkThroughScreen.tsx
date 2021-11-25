import React, { useCallback } from 'react';
import {Pressable, View, Text, StyleSheet, Image} from 'react-native';
import CustomButton from '../../common/CustomButton';
import HomeIndicator from '../../common/HomeIndicator';
import {RootStackParamList} from '../../types/types';
import { StackScreenProps } from '@react-navigation/stack'


type WalkThroughProps = StackScreenProps<RootStackParamList, 'Home'>;

const WalkThroughScreen: React.FC<WalkThroughProps> = ({ navigation }) => {

const handleStartMessaging = useCallback(()=> {
  navigation.navigate('PhoneInputScreen')}
  , [])

  return (
    <View style={walkThroughStyles.walkThroughContainer}>

      <View style={{flex: 1, alignItems: 'center', marginTop: 50, marginBottom: 42}}>
        <Image
          source={require('../../assets/chatPic.png')}
          style={{width: 262, height: 271}}></Image>
      </View>
      <View style={walkThroughStyles.textContainer}>
        <Text style={walkThroughStyles.textStyle}>
          Connect easily with your family and friends over countries
        </Text>
      </View>
      <View style={walkThroughStyles.pressableContainer}>
        <Pressable>
          <Text style={walkThroughStyles.pressableText}>
            Terms & Privacy Policy
          </Text>
        </Pressable>
      </View>
      <View style={walkThroughStyles.startMessage}>
        <CustomButton
          title={'Start Messaging'}
          handleOnPress={handleStartMessaging}
        />
      </View>
     <HomeIndicator />
    </View>
  );
};

const walkThroughStyles = StyleSheet.create({
  walkThroughContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    position: 'absolute',
    width: 280,
    height: 90,
    left: 47,
    right: 48,
    top: 350,
  },
  textStyle: {
    fontFamily: 'Mulish-Bold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
    color: '#0F1828',
  },
  pressableContainer: {
    position: 'absolute',
    width: 148,
    height: 24,
    left: 113,
    top: 580
  },
  pressableText: {
    fontFamily: 'Mulish-Medium',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#0F1828',
  },
  startMessage: {
    marginBottom: 50
  }
});

export default WalkThroughScreen;
