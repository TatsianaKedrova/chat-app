import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
  Image,
  
} from 'react-native';

export type ModalCommonPropsType = {
  visible: boolean;
  handleOnPress: () => void;
  scaleValue: Animated.Value
};

const ModalCommon: React.FC<ModalCommonPropsType> = ({
  children,
  visible,
  handleOnPress,
  scaleValue
}) => {

  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          <View style={{alignItems: 'center'}}>
            {children}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleOnPress}>
                <Image
                  source={require('../assets/okButton.png')}
                  style={{width: 60, height: 60}}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalCommon;
