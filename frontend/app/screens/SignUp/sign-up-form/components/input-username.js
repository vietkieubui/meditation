import API from '@utils/API';
import {useFormikContext} from 'formik';
import React, {memo, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import ENV from 'react-native-config';
import {useMutation} from 'react-query';
import {useSetRecoilState} from 'recoil';
import {styles} from '../../sign-up.style';
import {validateForm} from '../recoil';

const Username = () => {
  const formik = useFormikContext();
  const [textError, setTextError] = useState();
  const setValidate = useSetRecoilState(validateForm);
  const {handleChange, handleBlur, errors, touched, values} = formik;
  const {mutate: getUsername} = useMutation(
    username => {
      const config = {
        baseURL: ENV.CONFIRM_OTP_API,
        url: `/registry-api/clients/customers/username/${username}`,
      };
      return API.request(config);
    },
    {
      onError: e => {
        if (e?.description) {
          setTextError('Tên đăng nhập đã tồn tại');
          setValidate(true);
        }
      },
    },
  );

  useEffect(() => {
    setTextError();
    setValidate(false);
  }, [setValidate, values.username]);

  useEffect(() => {
    if (values.username && touched.username) {
      getUsername(values.username);
    }
  }, [getUsername, touched.username, values.username]);

  return (
    <>
      <View style={styles.vUsername}>
        <Text style={styles.tUsername}>Tên đăng nhập</Text>
        <View style={styles.vUsernameInput}>
          <TextInput
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username.toLowerCase().replace(/\s/g, '')}
            autoCapitalize="none"
            maxLength={35}
            style={
              values.username ? styles.tiUsernameActive : styles.tiUsername
            }
            returnKeyType="next"
          />
        </View>
      </View>
      {!!errors.username && touched.username && (
        <Text style={styles.tErrorUsername}>{errors.username}</Text>
      )}
      {!errors.username && !!textError && (
        <Text style={styles.tErrorUsername}>{textError}</Text>
      )}
    </>
  );
};
export default memo(Username);
