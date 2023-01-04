import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Toast, {BaseToast} from 'react-native-toast-message';

export const setAsyncStorage = async (key, value) => {
  try {
    if (!value) {
      await AsyncStorage.removeItem(key);
    } else {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    }
  } catch (e) {
    console.error('setAsyncStorage-fail:', e);
  }
};

export const getAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    console.error('getAsyncStorage-fail:', e);
  }
};

export const showToast = (type, text1, text2) => {
  Toast.show({
    // visibilityTime: 1000,
    text1: text1,
    text2: text2,
    // topOffset: 72,
    type: type || 'info',
  });
};

export const toastConfig = {
  error: ({...rest}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: 'red'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),

  success: ({...rest}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: 'green'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),

  info: ({...rest}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: '#87CEFA'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
    />
  ),
};
