import React, {memo, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import SignUpHeader from '../sign-up.header';
import {styles} from '../sign-up.style';
import CfPassword from './components/input-cf-password';
import Email from './components/input-email';
import Fullname from './components/input-fullname';
import Password from './components/input-password';
import Phone from './components/input-phone';
import Username from './components/input-username';
import ModalError from './modal-error';

const SignUpForm = () => {
  const modalErrorRef = useRef();

  return (
    <View style={styles.vForm}>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <SignUpHeader />
            <Fullname />
            <Phone />
            <Email />
            <Username />
            <Password />
            <CfPassword />
          </View>
        </ScrollView>
      </View>
      <ModalError ref={modalErrorRef} />
    </View>
  );
};

export default memo(SignUpForm);
