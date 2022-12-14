import API from '@utils/API';
import {useFormikContext} from 'formik';
import React, {memo, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import ENV from 'react-native-config';
import {useMutation} from 'react-query';
import {useSetRecoilState} from 'recoil';
import {styles} from '../../sign-up.style';
import {validateForm} from '../recoil';

const Email = () => {
  const formik = useFormikContext();
  const [textError, setTextError] = useState();
  const setValidate = useSetRecoilState(validateForm);

  const {handleChange, handleBlur, touched, values, errors} = formik;

  const {mutate: getEmail} = useMutation(
    email => {
      const config = {
        baseURL: ENV.CONFIRM_OTP_API,
        url: `/registry-api/clients/customers/email/${email}`,
      };
      return API.request(config);
    },
    {
      onError: e => {
        if (e?.description) {
          setTextError('Email đã tồn tại');
          setValidate(true);
        }
      },
    },
  );

  useEffect(() => {
    setTextError();
    setValidate(false);
  }, [setValidate, values.email]);

  useEffect(() => {
    if (values.email && touched.email) {
      getEmail(values.email);
    }
  }, [getEmail, touched.email, values.email]);

  return (
    <>
      <View style={styles.vEmail}>
        <Text style={styles.tEmail}>Email</Text>
        <View style={styles.vEmailInput}>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email.replace(/\s/g, '')}
            placeholder="example@gmail.com"
            autoCapitalize="none"
            maxLength={200}
            style={values.email ? styles.tiEmailActive : styles.tiEmail}
            returnKeyType="next"
          />
        </View>
      </View>
      {!!errors.email && touched.email && (
        <Text style={styles.tErrorEmail}>{errors.email}</Text>
      )}
      {!errors.email && !!textError && (
        <Text style={styles.tErrorEmail}>{textError}</Text>
      )}
    </>
  );
};
export default memo(Email);
