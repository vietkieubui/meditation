import { useNavigation } from '@react-navigation/native';
import IconNoti from 'assets/images/icon-header-noti.png';
import Text from 'component/text';
import { memo, useCallback, useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useQueryClient } from 'react-query';
import { useMutationResetNoti } from './navigation-bar.mutate';
import { useQueryGetNumOfNotiUnSeen } from './navigation-bar.query';
import { styles } from './navigation-bar.style';

const ActionNoti = ({ onPressNoti }) => {
  const navigation = useNavigation();

  const queryClient = useQueryClient();
  const { data: numOfNotiUnSeen } = useQueryGetNumOfNotiUnSeen();
  const { mutate: resetNotiUnseen } = useMutationResetNoti();

  const textNotiStyle = useMemo(() => {
    if (numOfNotiUnSeen > 99) {
      return styles.tNumberNotiUnseenLarge;
    }
    if (numOfNotiUnSeen > 9) {
      return styles.tNumberNotiUnseenMedium;
    }
    return styles.tNumberNotiUnseen;
  }, [numOfNotiUnSeen]);

  const onNoti = useCallback(() => {
    if (onPressNoti) {
      onPressNoti();
      return;
    }
    queryClient.refetchQueries(['NUMBER_OF_NOTI_UNSEEN']);
    resetNotiUnseen();
    navigation.navigate('NotificationList');
  }, [navigation, onPressNoti, queryClient, resetNotiUnseen]);

  return (
    <TouchableOpacity
      style={styles.toNoti}
      activeOpacity={0.8}
      onPress={onNoti}>
      <Image source={IconNoti} style={styles.imgIconSearch} />
      {!!numOfNotiUnSeen && numOfNotiUnSeen > 0 && (
        <View style={styles.vNumberNotiUnseen}>
          <Text style={textNotiStyle}>
            {numOfNotiUnSeen > 99 ? '99+' : numOfNotiUnSeen}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(ActionNoti);
