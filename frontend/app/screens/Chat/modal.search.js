import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {useMutationAddChat} from './mutate';

const ModalSearch = forwardRef((props, ref) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal() {
      setIsVisible(true);
    },
  }));

  const {mutate} = useMutationAddChat(setIsVisible);

  const onPress = useCallback(() => {
    mutate(phoneNumber);
  }, [mutate, phoneNumber]);

  const onPressCancel = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <Modal isVisible={isVisible}>
      <View
        style={{
          backgroundColor: '#fff',
          alignItems: 'center',
          borderRadius: 15,
          paddingTop: 20,
        }}>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          keyboardType={'numeric'}
          maxLength={10}
          onChangeText={text => setPhoneNumber(text)}
          placeholder="Nhập số điện thoại"
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.buttonCancel} onPress={onPressCancel}>
            <Text style={styles.buttonText}>Huỷ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Nhắn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default memo(ModalSearch);

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FAAB78',
    width: 100,
    height: 44,
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  buttonCancel: {
    backgroundColor: '#999',
    width: 100,
    height: 44,
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
