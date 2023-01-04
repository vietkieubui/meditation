import {activeProfileAtom} from '@utils/active-profile';
import API from '@utils/API';
import {useMutation} from 'react-query';
import {useSetRecoilState} from 'recoil';
import {accessTokenState} from '../../../state-management/access-token';

export const useMutationLogin = onShowModalError => {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setActiveProfile = useSetRecoilState(activeProfileAtom);

  return useMutation(
    values => {
      const {username, password} = values;
      const config = {
        method: 'POST',
        url: '/auth/login',
        params: {
          phoneNumber: username,
          password,
        },
      };
      return API.request(config);
    },
    {
      onSuccess: async response => {
        setAccessToken(response?.data?.accessToken);
        setActiveProfile(response?.data?.user);
      },
      onError: e => {
        onShowModalError(e?.message || 'Không thể đăng nhập do lỗi hệ thống');
      },
    },
  );
};

export const useMutationRegister = onShowModalError => {
  const setAccessToken = useSetRecoilState(accessTokenState);

  return useMutation(
    values => {
      const {phone, password, fullname} = values;
      const config = {
        method: 'POST',
        url: '/auth/register',
        params: {
          name: fullname,
          phoneNumber: phone,
          password,
        },
      };
      return API.request(config);
    },
    {
      onSuccess: async response => {
        setAccessToken(response?.accessToken);
      },
      onError: e => {
        onShowModalError(
          e?.message || 'Không thể đăng kí tài khoản do lỗi hệ thống',
        );
      },
    },
  );
};
