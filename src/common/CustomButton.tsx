import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export type CommonButtonPropsType = {
  title: string;
  handleOnPress: () => void;
};

const CustomButton: React.FC<CommonButtonPropsType> = ({
  title,
  handleOnPress,
}) => {
  return (
    <TouchableOpacity
      style={customButtonStyles.container}
      onPress={handleOnPress}>
      <Text style={customButtonStyles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const customButtonStyles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    backgroundColor: '#002DE3',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 48,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Mulish-Bold'
  },
});

export default CustomButton;
