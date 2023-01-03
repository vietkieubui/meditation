import {useFormikContext} from 'formik';
import React, {memo, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import IconEyeSlash from '../../images/icon-eye-slash.png';
import IconEye from '../../images/icon-eye.png';
import {styles} from '../../sign-up.style';

const CfPassword = () => {
  const formik = useFormikContext();
  const {handleChange, handleBlur, errors, touched, values} = formik;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <View style={styles.vPassword}>
        <Text style={styles.tPassword}>Xác nhận</Text>
        <View style={styles.vPasswordInput}>
          <TextInput
            onChangeText={handleChange('cfPassword')}
            onBlur={handleBlur('cfPassword')}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            maxLength={32}
            value={values.cfPassword.replace(/\s/g, '')}
            style={
              values.cfPassword ? styles.tiPasswordActive : styles.tiPassword
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
      {!!errors.cfPassword && touched.cfPassword && (
        <Text style={styles.tErrorPassword}>{errors.cfPassword}</Text>
      )}
    </>
  );
};
export default memo(CfPassword);
