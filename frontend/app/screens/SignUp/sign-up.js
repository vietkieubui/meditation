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
import {validateForm, validateToggle} from './sign-up-form/recoil';
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
  username: yup
    .string()
    .required('Vui lòng nhập Tên đăng nhập')
    .min(4, 'Tên đăng nhập phải chứa tối thiểu 4 ký tự')
    .matches(
      /[0-9a-z_.]+$/,
      'Tên đăng nhập chỉ bao gồm chữ thường a-z, số 0-9, ký tự "_" hoặc "."',
    ),
  email: yup
    .string()
    .min(12, 'Email phải chứa tối thiểu 12 ký tự')
    .matches(
      /^((<>()[].,;:s@]+(.<>()[].,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/,
      'Vui lòng nhập email đúng định dạng',
    )
    .required('Vui lòng nhập Email'),
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
  referralCode: yup
    .string()
    .max(10)
    .min(10, 'Mã người giới thiệu phải chứa tối thiểu 10 ký tự'),
  termsOfService: yup.bool().oneOf([true], 'Vui lòng xác nhận đồng ý'),
});

const SignUp = () => {
  const checkValidateForm = useRecoilValue(validateForm);
  const checkValidateToggle = useRecoilValue(validateToggle);
  const navigation = useNavigation();

  const initialValues = {
    fullname: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    cfPassword: '',
    referralCode: '',
    termsOfService: true,
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
  // useEffect(() => {
  //   if (checkValidateToggle) {
  //     showToast(
  //       'error',
  //       'Vui lòng xác nhận đồng ý với các thoả thuận sử dụng của Stockbook',
  //     );
  //   }
  // }, [checkValidateToggle]);

  return (
    <SafeAreaView style={styles.savMain}>
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
