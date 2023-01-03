import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from '../sign-up.style';

const ModalError = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useImperativeHandle(ref, () => ({
    showModal(message) {
      setIsVisible(true);
      setErrorMessage(message);
    },
  }));

  return (
    <Modal isVisible={isVisible}>
      <View>
        <View style={styles.vModalError}>
          {/* <Image source={IconError} style={styles.imgIconModalError} /> */}
          <Text style={styles.tContentModalError}>{errorMessage}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsVisible(false)}
            style={styles.toConfirmModalError}>
            <Text style={styles.tConfirmModalError}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default memo(ModalError);
