import React, {memo} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './loading-screen.style';

const LoadingScreen = ({onLoadEnd}) => {
  return (
    <View style={styles.vLoading}>
      <ActivityIndicator
        style={styles.aiLoading}
        color="#bfbfbf"
        size="large"
      />
    </View>
  );
};

export default memo(LoadingScreen);
