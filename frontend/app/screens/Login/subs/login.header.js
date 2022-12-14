import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {styles} from './login.style';

const LoginHeader = () => {
  return (
    <View style={styles.vHeader}>
      {/* <Image source={ImgLogo} style={styles.imgLogo} /> */}
      <Text style={styles.tLoginLabel}>Đăng nhập Meditation</Text>
    </View>
  );
};

export default memo(LoginHeader);
