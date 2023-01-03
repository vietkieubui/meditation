import React, {memo} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconContact from './images/icon-contact.png';
import LoginForm from './subs/login-form';
import LoginFooter from './subs/login.footer';
import LoginHeader from './subs/login.header';
import {styles} from './subs/login.style';

const Login = () => {
  return (
    <SafeAreaView style={styles.savMain}>
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.vMain}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <LoginHeader />
            <LoginForm />
            <LoginFooter />
          </ScrollView>
          <View style={styles.vFooterInfo}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.toContact}
              onPress={() => Linking.openURL('mailto:support@stockbook.vn')}>
              <Image source={IconContact} style={styles.imgContact} />
              <Text style={styles.tContact}>Liên hệ hỗ trợ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default memo(Login);
