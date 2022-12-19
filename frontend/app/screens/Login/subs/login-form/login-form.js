import {Formik} from 'formik';
import React, {memo, useCallback, useMemo, useRef} from 'react';
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

  const onShowModalError = useCallback(
    message => modalErrorRef.current.showModal(message),
    [],
  );

  const {mutate: loginApp, isLoading: isLoadingSb} = useMutationLogin();

  const isLoading = useMemo(() => isLoadingSb, [isLoadingSb]);

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
            <LoginUsername isLoading={isLoading} />
            <LoginPassword isLoading={isLoading} />
            <LoginSubmit isLoading={isLoading} />
          </View>
        )}
      </Formik>
      <ModalError ref={modalErrorRef} />
    </View>
  );
};

export default memo(LoginForm);
