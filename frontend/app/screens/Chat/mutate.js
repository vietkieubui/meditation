import {useNavigation} from '@react-navigation/native';
import API from '@utils/API';
import {showToast} from '@utils/helpers';
import {useMutation} from 'react-query';

export const useMutationAddChat = setIsVisible => {
  const navigation = useNavigation();
  return useMutation(
    phoneNumber => {
      const config = {
        method: 'POST',
        url: `/conversation/phonenumber`,
        params: {
          phoneNumber,
        },
      };
      return API.request(config);
    },
    {
      onSuccess: res => {
        setIsVisible(false);
        navigation.navigate('Message', {
          id: res.data.members.id,
        });
      },
      onError: error => {
        showToast(
          'error',
          `Lỗi: ${error.message || 'Không tìm thấy người dùng'}`,
        );
      },
    },
  );
};
