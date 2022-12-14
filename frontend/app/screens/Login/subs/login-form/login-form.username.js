import {useFormikContext} from 'formik';
import React, {memo, useCallback} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {useSetRecoilState} from 'recoil';
import IconUsername from '../../images/icon-username.png';
import {focusPasswordAtom} from '../login.recoil';
import {styles} from '../login.style';

const LoginUsername = props => {
  const {isLoading} = props;
  const {handleChange, handleBlur, values, errors, touched} =
    useFormikContext();
  const setFocusPassword = useSetRecoilState(focusPasswordAtom);

  const onSubmitEditing = useCallback(
    () => setFocusPassword(true),
    [setFocusPassword],
  );

  return (
    <View style={styles.vUsername}>
      <View style={styles.vUsernameInput}>
        <TextInput
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          value={values.username}
          placeholder="Số điện thoại"
          autoCapitalize="none"
          editable={!isLoading}
          selectTextOnFocus={!isLoading}
          style={values.username ? styles.tiUsernameActive : styles.tiUsername}
          returnKeyType="next"
          onSubmitEditing={onSubmitEditing}
        />
        <Image source={IconUsername} style={styles.imgIconUsername} />
      </View>

      {!!errors.username && touched.username && (
        <Text style={styles.tErrorUsername}>{errors.username}</Text>
      )}
    </View>
  );
};

export default memo(LoginUsername);
