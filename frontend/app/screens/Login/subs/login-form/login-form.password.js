import {useFormikContext} from 'formik';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import IconEyeSlash from '../../images/icon-eye-slash.png';
import IconEye from '../../images/icon-eye.png';
import IconPassword from '../../images/icon-password.png';
import {focusPasswordAtom} from '../login.recoil';
import {styles} from '../login.style';

const LoginPassword = props => {
  const {isLoading} = props;
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef();
  const {handleChange, handleBlur, values, errors, touched, handleSubmit} =
    useFormikContext();

  const focusPassword = useRecoilValue(focusPasswordAtom);

  const onChangeShowPassword = useCallback(
    () => setShowPassword(!showPassword),
    [showPassword],
  );

  useEffect(() => {
    if (focusPassword) {
      passwordRef.current?.focus();
    }
  }, [focusPassword]);

  return (
    <View style={styles.vPassword}>
      <View style={styles.vPasswordInput}>
        <TextInput
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          placeholder="Mật khẩu"
          ref={passwordRef}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          editable={!isLoading}
          selectTextOnFocus={!isLoading}
          value={values.password}
          style={values.password ? styles.tiPasswordActive : styles.tiPassword}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>
      <Image source={IconPassword} style={styles.imgIconPassword} />
      <TouchableOpacity
        style={styles.toShowPassword}
        activeOpacity={0.8}
        onPress={onChangeShowPassword}>
        <Image
          source={showPassword ? IconEye : IconEyeSlash}
          style={styles.imgIconShowPassword}
        />
      </TouchableOpacity>

      {!!errors.password && touched.password && (
        <Text style={styles.tErrorPassword}>{errors.password}</Text>
      )}
    </View>
  );
};

export default memo(LoginPassword);
