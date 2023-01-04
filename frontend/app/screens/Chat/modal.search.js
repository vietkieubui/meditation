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
          placeholder="Enter phone number"
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Nhắn tin</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
});

export default memo(ModalSearch);

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FAAB78',
    width: 150,
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
