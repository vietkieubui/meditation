import {useFormikContext} from 'formik';
import React, {memo} from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from '../../sign-up.style';

const Fullname = () => {
  const formik = useFormikContext();
  const {handleChange, handleBlur, errors, touched, values} = formik;

  return (
    <>
      <View style={styles.vFullname}>
        <Text style={styles.tFullname}>Họ và tên</Text>
        <View style={styles.vFullnameInput}>
          <TextInput
            onChangeText={handleChange('fullname')}
            onBlur={handleBlur('fullname')}
            placeholder="Họ tên trên CMND/CCCD"
            maxLength={200}
            value={values.fullname}
            style={
              values.fullname ? styles.tiFullnameActive : styles.tiFullname
            }
            returnKeyType="next"
          />
        </View>
      </View>
      {!!errors.fullname && touched.fullname && (
        <Text style={styles.tErrorFullname}>{errors.fullname}</Text>
      )}
    </>
  );
};
export default memo(Fullname);
