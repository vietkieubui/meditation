import {useNavigation} from '@react-navigation/native';
import API from '@utils/API';
import {useMutation} from 'react-query';
// import {accessTokenState} from 'state-management/access-token';
// import {deviceIdAtom} from 'state-management/device-id';
// import {nicknameState} from 'state-management/user-nickname';

export const useMutationLoginSb = onShowModalError => {
  // const deviceId = useRecoilValue(deviceIdAtom);
  // const setAccessToken = useSetRecoilState(accessTokenState);
  // const setNickname = useSetRecoilState(nicknameState);
  const navigation = useNavigation();

  console.log(12345);

  return useMutation(
    values => {
      const {phoneNumber, password} = values;
      const config = {
        method: 'POST',
        url: '/auth/login',
        params: {
          phoneNumber,
          password,
        },
      };
      return API.request(config);
    },
    {
      onSuccess: async (response, {sessionId}) => {
        console.log('response', response);
        // setAccessToken(response?.accessToken);
        // setNickname(response?.nickname);
      },
      onError: e => {
        onShowModalError(e?.message || 'Không thể đăng nhập do lỗi hệ thống');
      },
    },
  );
};
