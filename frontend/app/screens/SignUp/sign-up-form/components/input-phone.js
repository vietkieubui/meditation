import API from '@utils/API';
import {useFormikContext} from 'formik';
import React, {memo, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import ENV from 'react-native-config';
import {useMutation} from 'react-query';
import {useSetRecoilState} from 'recoil';
import {styles} from '../../sign-up.style';
import {validateForm} from '../recoil';

const Phone = () => {
  const formik = useFormikContext();
  const [textError, setTextError] = useState();
  const setValidate = useSetRecoilState(validateForm);

  const {handleChange, handleBlur, touched, values, errors} = formik;
  const {mutate: getPhone} = useMutation(
    phone => {
      const config = {
        baseURL: ENV.CONFIRM_OTP_API,
        url: `/registry-api/clients/customers/phone/${phone}`,
      };
      return API.request(config);
    },
    {
      onError: e => {
        if (e?.description) {
          setTextError('Số điện thoại đã tồn tại');
          setValidate(true);
        }
      },
    },
  );

  useEffect(() => {
    setTextError();
    setValidate(false);
  }, [setValidate, values.phone]);

  useEffect(() => {
    if (values.phone && touched.phone && values.phone.length === 10) {
      getPhone(values.phone);
    }
  }, [getPhone, touched.phone, values.phone]);

  return (
    <>
      <View style={styles.vPhone}>
        <Text style={styles.tPhone}>Số điện thoại</Text>
        <View style={styles.vPhoneInput}>
          <TextInput
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone.replace(/\s/g, '')}
            maxLength={10}
            autoCapitalize="none"
            keyboardType="numeric"
            style={values.phone ? styles.tiPhoneActive : styles.tiPhone}
            returnKeyType="next"
          />
        </View>
      </View>
      {!!errors.phone && touched.phone && (
        <Text style={styles.tErrorPhone}>{errors.phone}</Text>
      )}
      {!errors.phone && !!textError && (
        <Text style={styles.tErrorPhone}>{textError}</Text>
      )}
    </>
  );
};
export default memo(Phone);
