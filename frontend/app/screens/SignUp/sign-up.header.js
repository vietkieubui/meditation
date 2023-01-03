import React, {memo} from 'react';
import {Text} from 'react-native';
import {styles} from './sign-up.style';

const SignUpHeader = () => {
  return (
    <Text style={styles.tSignUpLabel}>
      Bạn vui lòng nhập các thông tin dưới đây để mở tài khoản
    </Text>
  );
};

export default memo(SignUpHeader);
