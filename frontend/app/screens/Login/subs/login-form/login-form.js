import {Formik} from 'formik';
import React, {memo, useCallback, useMemo, useRef} from 'react';
import {Keyboard, View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {accessTokenState} from '../../../../state-management/access-token';
// import {getAsyncStorage, setAsyncStorage} from 'utils/helper';
import * as yup from 'yup';
import {useMutationLoginSb} from '../login.mutate';
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
  const setAccessToken = useSetRecoilState(accessTokenState);
  const modalErrorRef = useRef();

  const initialValues = {
    phoneNumber: '',
    password: '',
  };

  const onShowModalError = useCallback(
    message => modalErrorRef.current.showModal(message),
    [],
  );

  const {mutate: loginStockbook, isLoading: isLoadingSb} = useMutationLoginSb();

  const isLoading = useMemo(() => isLoadingSb, [isLoadingSb]);

  const onSubmitForm = useCallback(
    values => {
      Keyboard.dismiss();
      setAccessToken('123');
      // loginStockbook(values);
    },
    [setAccessToken],
  );

  // useEffect(() => {
  //   const checkLoginInfo = async () => {
  //     const storageLoginInfo = await getAsyncStorage('remember-login');
  //   };
  //   checkLoginInfo();
  // }, []);

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
