import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useMemo, useRef} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import IconLine from '../images/icon-line.png';
import LogoFB from '../images/logo-facebook.png';
import LogoGG from '../images/logo-google.png';
import ModalNoFeature from './login-form/modal-no-feature';
import {styles} from './login.style';

const LoginFooter = () => {
  const navigation = useNavigation();
  const modalRef = useRef();
  const {width} = useWindowDimensions();
  const isSmallMobile = useMemo(() => width < 350, [width]);

  const onShowModalFeature = useCallback(() => {
    modalRef.current.showModal();
  }, []);

  const onLoginVND = useCallback(() => {
    navigation.navigate('LoginVND');
  }, [navigation]);

  const loginOtherData = useMemo(
    () => [
      {
        logo: LogoGG,
        title: 'Google',
        onPress: onShowModalFeature,
      },
      {
        logo: LogoFB,
        title: 'Facebook',
        onPress: onShowModalFeature,
      },
    ],
    [onShowModalFeature],
  );

  // const onOpenMailSupport = useCallback(() => {
  //   Linking.openURL(
  //     'mailto:Support@stockbook.vn?subject=Hỗ trợ đăng nhập bằng tài khoản Google, Facebook&body=Họ tên:%0D%0ASố điện thoại:%0D%0ANickname:',
  //   );
  // }, []);

  // const onOpenWebView = useCallback(() => {
  //   navigation.navigate('WebView', {
  //     link: 'https://accounts.vndirect.com.vn/forgot-password',
  //     title: 'Quên mật khẩu',
  //   });
  // }, [navigation]);

  return (
    <View style={styles.vFooter}>
      {/* <Text style={styles.tSupport}>
        Bạn đã có tài khoản đăng nhập bằng Facebook, Google? Liên hệ hỗ trợ
        <Text style={styles.tSupportClick} onPress={onOpenMailSupport}>
          {' '}
          tại đây
        </Text>
      </Text> */}

      <View style={styles.vLabelLoginOther}>
        <Image source={IconLine} />
        <Text style={styles.tLabelLoginOther}>Hoặc đăng nhập bằng</Text>
        <Image source={IconLine} />
      </View>

      <View>
        <FlatList
          data={loginOtherData}
          horizontal
          contentContainerStyle={styles.ccStyleOther}
          keyExtractor={item => item.title}
          renderItem={({item}) => {
            const {logo, title, onPress} = item;
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={[
                  styles.toOtherItem,
                  {
                    width: isSmallMobile ? 90 : 110,
                  },
                ]}>
                <Image source={logo} style={styles.imgOtherItem} />
                {!isSmallMobile && (
                  <Text style={styles.tOtherItem}>{title}</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/* <TouchableOpacity
        activeOpacity={0.8}
        style={styles.toForgotPassword}
        onPress={onOpenWebView}>
        <Text style={styles.tForgotPassword}>Bạn quên mật khẩu?</Text>
      </TouchableOpacity> */}

      <ModalNoFeature ref={modalRef} />
    </View>
  );
};

export default memo(LoginFooter);
