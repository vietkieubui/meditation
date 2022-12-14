// import NavigationBar from '@components/navigation-bar';
import {useNavigation} from '@react-navigation/native';
import API from '@utils/API';
import {Formik} from 'formik';
import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ENV from 'react-native-config';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useMutation} from 'react-query';
import {useRecoilValue} from 'recoil';
// import {showToast} from 'utils/helper';
import * as yup from 'yup';
import SignUpForm from './sign-up-form';
import {validateForm} from './sign-up-form/recoil';
import {styles} from './sign-up.style';

const loginSchema = yup.object().shape({
  fullname: yup
    .string()
    .required('Vui lòng nhập Họ và tên')
    .min(4, 'Họ và tên phải chứa tối thiểu 4 ký tự')
    .max(200),
  phone: yup
    .string()
    .matches(/([0-9]{10})\b/, 'Vui lòng nhập số điện thoại đủ 10 ký tự')
    .required('Vui lòng nhập Số điện thoại'),
  password: yup
    .string()
    .required('Vui lòng nhập Mật khẩu')
    .min(8, 'Mật khẩu phải chứa tối thiểu 8 ký tự'),
  cfPassword: yup
    .string()
    .required('Vui lòng nhập Xác nhận')
    .oneOf(
      [yup.ref('password'), null],
      'Mật khẩu phải trùng với mật khẩu đăng ký',
    ),
});

const SignUp = () => {
  const checkValidateForm = useRecoilValue(validateForm);
  const navigation = useNavigation();

  const initialValues = {
    fullname: '',
    phone: '',
    password: '',
    cfPassword: '',
  };

  const {mutate: getOtpSMS} = useMutation(phone => {
    const config = {
      baseURL: ENV.GET_OTP_API,
      params: {
        template: 'sms_otp_trading_vi',
        send: phone,
        type: 'PHONE',
      },
    };
    return API.request(config);
  });

  return (
    <SafeAreaView style={styles.savMain}>
      {/* <NavigationBar title="Mở tài khoản" /> */}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={values => {
          const {phone} = values;
          Keyboard.dismiss();
          if (!checkValidateForm) {
            getOtpSMS(phone);
            navigation.navigate('OtpSignUp', {valuesSignUp: values});
          }
        }}>
        {({handleSubmit}) => (
          <View style={{flex: 1}}>
            <KeyboardAvoidingScrollView
              stickyFooter={
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                  style={styles.toLogin}>
                  <Text style={styles.tLogin}>Tiếp tục</Text>
                </TouchableOpacity>
              }>
              <SignUpForm />
            </KeyboardAvoidingScrollView>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUp;
