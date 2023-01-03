import React, {forwardRef, memo, useImperativeHandle, useState} from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from '../login.style';

const ModalNoFeature = forwardRef((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal() {
      setIsVisible(true);
    },
  }));

  return (
    <Modal isVisible={isVisible}>
      <View>
        <View style={styles.vModalNoFeature}>
          <Text style={styles.tSupport}>
            Bạn đã có tài khoản đăng nhập bằng Facebook, Google? Liên hệ hỗ trợ{' '}
            <Text
              style={styles.tSupportClick}
              onPress={() => {
                Linking.openURL(
                  'mailto:Support@stockbook.vn?subject=Hỗ trợ đăng nhập bằng tài khoản Google, Facebook&body=Họ tên:%0D%0ASố điện thoại:%0D%0ANickname:',
                );
              }}>
              tại đây
            </Text>
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsVisible(false)}
            style={styles.toConfirmModalNoFeature}>
            <Text style={styles.tConfirmModalNoFeature}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default memo(ModalNoFeature);
