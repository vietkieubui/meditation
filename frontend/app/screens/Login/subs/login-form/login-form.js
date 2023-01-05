import {Formik} from 'formik';
import React, {memo, useCallback, useRef} from 'react';
import {Keyboard, View} from 'react-native';
// import {getAsyncStorage, setAsyncStorage} from 'utils/helper';
import * as yup from 'yup';
import {useMutationLogin} from '../login.mutate';
import {styles} from '../login.style';
import LoginPassword from './login-form.password';
import LoginSubmit from './login-form.submit';
import LoginUsername from './login-form.username';
import ModalError from './modal-error';

const loginSchema = yup.object().shape({
  username: yup.string().required('Bạn chưa điền Số điện thoại'),
  password: yup.string().required('Bạn chưa điền Mật khẩu'),
});

const LoginForm = () => {
  const modalErrorRef = useRef();

  const initialValues = {
    phoneNumber: '',
    password: '',
  };

  const {mutate: loginApp, isLoading: isLoadingSb} = useMutationLogin();

  const onSubmitForm = useCallback(
    values => {
      Keyboard.dismiss();
      loginApp(values);
    },
    [loginApp],
  );

  return (
    <View style={styles.vForm}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={onSubmitForm}>
        {() => (
          <View>
            <LoginUsername isLoading={isLoadingSb} />
            <LoginPassword isLoading={isLoadingSb} />
            <LoginSubmit isLoading={isLoadingSb} />
          </View>
        )}
      </Formik>
      <ModalError ref={modalErrorRef} />
    </View>
  );
};

export default memo(LoginForm);
