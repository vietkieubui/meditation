import {useNavigation} from '@react-navigation/native';
import API from '@utils/API';
import {Formik} from 'formik';
import React, {memo, useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ENV from 'react-native-config';
import {useMutation} from 'react-query';
import {useSetRecoilState} from 'recoil';
import {vndidTokenState} from 'state-management/vndid-token';

// import {showToast} from 'utils/helper';
import * as yup from 'yup';
import {styles} from './otp-sign-up.style';

const loginSchema = yup.object().shape({
  otp: yup
    .string()
    .required('Vui lòng nhập mã xác thực')
    .matches(/^[0-9]+$/, 'OTP chỉ bao gồm số 0-9')
    .min(6, 'Vui lòng nhập mã xác thực đủ 6 ký tự'),
});

const OtpSignUp = props => {
  const {route} = props;
  const {params} = route;
  const {valuesSignUp} = params;
  const navigation = useNavigation();
  const setVndidToken = useSetRecoilState(vndidTokenState);

  const [otp, setOtp] = useState([]);
  const [otpVal, setOtpVal] = useState('');
  const [counter, setCounter] = useState(30);
  const [methodOtp, setMethodOtp] = useState(true); // true = SMS
  const [textError, setTextError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    otp,
  };

  const getPhoneOtp = valuesSignUp.phone.substring(0, 7) + '***';
  const index1 = valuesSignUp.email.indexOf('@');
  const getEmailOtp =
    valuesSignUp.email.substring(0, index1 / 2) +
    '***' +
    valuesSignUp.email.substring(index1);

  useEffect(() => {
    if (counter <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  const {mutate: getOtpEmail} = useMutation(
    () => {
      const config = {
        baseURL: ENV.GET_OTP_API,
        params: {
          type: 'EMAIL',
          subject: 'Xác thực email',
          send: valuesSignUp.email,
          customerName: valuesSignUp.fullname,
          template: 'email_otp_openFreeAccount',
        },
      };
      return API.request(config);
    },
    {
      onSuccess: e => {},
    },
  );

  const {mutate: getOtpSMS} = useMutation(() => {
    const config = {
      baseURL: ENV.GET_OTP_API,
      params: {
        template: 'sms_otp_trading_vi',
        send: valuesSignUp.phone,
        type: 'PHONE',
      },
    };
    return API.request(config);
  });

  const {mutate: loginVndId} = useMutation(
    values => {
      const {username, password} = values;
      const config = {
        method: 'POST',
        url: ENV.VNDID_LOGIN,
        params: {
          userName: username,
          password,
        },
      };
      return API.request(config);
    },
    {
      onSuccess: async response => {
        await setVndidToken(response?.tokenJwt);
        navigation.navigate('CreateNickname', {
          sessionId: response?.sessionId,
          registerSource: 'SB',
        });
      },
    },
  );
  const {mutate: cfOtp} = useMutation(
    confirmOtp => {
      const config = {
        method: 'POST',
        baseURL: ENV.CONFIRM_OTP_API,
        url: `/registry-api/clients/customers/free-account?otp=${confirmOtp}`,
        params: {
          username: valuesSignUp.username,
          password: valuesSignUp.password,
          fullName: valuesSignUp.fullname,
          email: valuesSignUp.email,
          phone: valuesSignUp.phone,
          referralCode: valuesSignUp.referralCode,
          notifyChannel: methodOtp ? 'SMS' : 'EMAIL',
          openSource: Platform.OS === 'ios' ? 'VND_SB_IOS' : 'VND_SB_ANDROID',
        },
      };
      return API.request(config);
    },
    {
      onSuccess: e => {
        loginVndId(valuesSignUp);
        setIsLoading(false);
      },
      onError: e => {
        setIsLoading(false);
        if (e.description) {
          setTextError(e.description);
          const myTimeout1 = setTimeout(() => {
            setTextError();
          }, 5000);
        } else {
          setTextError(
            'Có lỗi xảy ra, vui lòng liên hệ 1900545409 để được hỗ trợ',
          );
          const myTimeout2 = setTimeout(() => {
            setTextError();
          }, 5000);
        }
      },
    },
  );

  useEffect(() => {
    if (otp[5] !== undefined) {
      cfOtp(otp);
      setIsLoading(true);
    }
  }, [cfOtp, otp]);

  return (
    <SafeAreaView style={styles.savMain}>
      <View style={styles.vMain}>
        <Text>
          <Text style={styles.tLabel}>
            Quý khách vui lòng nhập mã OTP được gửi đến
          </Text>
          <Text style={styles.tLabel}>
            {methodOtp ? ' số điện thoại' : ' email'}
          </Text>
          <Text style={styles.tLabelBold}>
            {methodOtp ? ` ${getPhoneOtp} ` : ` ${getEmailOtp} `}
          </Text>
          <Text style={styles.tLabel}>để xác nhận việc mở tài khoản.</Text>
        </Text>

        <Text
          style={styles.teLink}
          onPress={() => {
            let val = '------';
            let a = [...val];
            setOtpVal(a);
            setOtp([]);
            methodOtp ? getOtpEmail() : getOtpSMS();
            setMethodOtp(!methodOtp);
            setCounter(30);
          }}>
          Nhận mã OTP qua
          {methodOtp ? ' Email' : ' SMS'}
        </Text>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={() => {
            cfOtp(otp);
          }}>
          {({
            values,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
          }) => (
            <>
              <TextInput
                onChangeText={value => {
                  if (isNaN(value)) {
                    return;
                  }
                  if (value.length > 6) {
                    return;
                  }
                  let val = value + '------'.substring(0, 6 - value.length);
                  let a = [...val];
                  setOtpVal(a);
                  setOtp(value);
                }}
                style={{height: 0, paddingTop: 20}}
                autoFocus={true}
                value={values.otp}
                keyboardType="numeric"
              />
              <View style={styles.otpBoxesContainer}>
                {[0, 1, 2, 3, 4, 5].map((item, index) => (
                  <View
                    style={
                      textError
                        ? styles.otpBoxError
                        : otpVal[item] === '-'
                        ? styles.otpBox
                        : styles.otpBoxSelect
                    }>
                    <Text style={styles.txtOtp} key={index}>
                      {otp[item]}
                    </Text>
                  </View>
                ))}
              </View>

              <Text
                style={counter > 0 ? styles.teRegularNone : styles.teRegular}
                onPress={() => {
                  if (counter === 0) {
                    let val = '------';
                    let a = [...val];
                    setOtpVal(a);
                    setOtp([]);
                    methodOtp ? getOtpSMS() : getOtpEmail();
                    setCounter(30);
                  }
                }}>
                {' '}
                Gửi lại OTP
                {counter > 0 && (
                  <Text style={styles.teLink}>{` (${counter}s)`}</Text>
                )}
              </Text>

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                style={isLoading ? styles.toWaitingLogin : styles.toLogin}
                disabled={isLoading}>
                <Text style={styles.tLogin}>
                  {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
                </Text>
              </TouchableOpacity>
              {!!errors.otp && touched.otp && (
                <Text style={styles.tErrorOtp}>{errors.otp}</Text>
              )}
              {!!textError && <Text style={styles.tErrorOtp}>{textError}</Text>}
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default memo(OtpSignUp);
