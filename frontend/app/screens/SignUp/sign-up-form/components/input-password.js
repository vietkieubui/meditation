import {useFormikContext} from 'formik';
import React, {memo, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import IconEyeSlash from '../../images/icon-eye-slash.png';
import IconEye from '../../images/icon-eye.png';
import {styles} from '../../sign-up.style';

const Password = () => {
  const formik = useFormikContext();
  const {handleChange, handleBlur, errors, touched, values} = formik;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <View style={styles.vPassword}>
        <Text style={styles.tPassword}>Mật Khẩu</Text>
        <View style={styles.vPasswordInput}>
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder="Mật khẩu"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            maxLength={32}
            value={values.password.replace(/\s/g, '')}
            style={
              values.password ? styles.tiPasswordActive : styles.tiPassword
            }
            returnKeyType="next"
          />
          <TouchableOpacity
            style={styles.toShowPassword}
            activeOpacity={0.8}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? IconEye : IconEyeSlash}
              style={styles.imgIconShowPassword}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!!errors.password && touched.password && (
        <Text style={styles.tErrorPassword}>{errors.password}</Text>
      )}
    </>
  );
};
export default memo(Password);
