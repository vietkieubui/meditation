import IconSearch from '@assets/images/icon-header-search.png';
import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {styles} from './navigation-bar.style';

const ActionSearch = ({onPressSearch}) => {
  const navigation = useNavigation();

  const onSearch = useCallback(() => {
    if (onPressSearch) {
      onPressSearch();
      return;
    }
    navigation.navigate('Search');
  }, [navigation, onPressSearch]);

  return (
    <TouchableOpacity
      style={styles.toSearch}
      activeOpacity={0.8}
      onPress={onSearch}>
      <Image source={IconSearch} style={styles.imgIconSearch} />
    </TouchableOpacity>
  );
};

export default memo(ActionSearch);
