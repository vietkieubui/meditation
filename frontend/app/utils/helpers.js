import AsyncStorage from '@react-native-async-storage/async-storage';

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
