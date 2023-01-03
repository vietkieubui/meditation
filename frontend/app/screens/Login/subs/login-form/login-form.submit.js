import {AuthStackRoutes} from '@constants/screens';
import {useNavigation} from '@react-navigation/native';

import {useFormikContext} from 'formik';
import React, {memo, useCallback} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from '../login.style';

const LoginSubmit = props => {
  const {isLoading} = props;
  const {handleSubmit} = useFormikContext();
  const navigation = useNavigation();

  const onOpenSignUp = useCallback(
    () => navigation.navigate(AuthStackRoutes.Register),
    [navigation],
  );

  return (
    <>
      <TouchableOpacity
        onPress={handleSubmit}
        activeOpacity={0.8}
        style={isLoading ? styles.toWaitingLogin : styles.toLogin}
        disabled={isLoading}>
        <Text style={styles.tLogin}>
          {isLoading ? 'Vui lòng chờ...' : 'Đăng nhập'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.toRegister}
        onPress={onOpenSignUp}>
        <Text style={styles.tRegister}>Mở tài khoản</Text>
      </TouchableOpacity>
    </>
  );
};

export default memo(LoginSubmit);
