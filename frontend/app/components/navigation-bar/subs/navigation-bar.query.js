import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from 'state-management/access-token';
import { nicknameState } from 'state-management/user-nickname';
import API from 'utils/API';
import { showToast } from 'utils/helper';

export const useQueryGetNumOfNotiUnSeen = () => {
  const nickname = useRecoilValue(nicknameState);
  const accessToken = useRecoilValue(accessTokenState);

  return useQuery(
    ['NUMBER_OF_NOTI_UNSEEN', nickname],
    () => {
      const config = {
        url: '/api/users/notifications/unread_number',
      };

      return API.request(config)
        .then(response => response)
        .catch(e => {
          showToast(
            'error',
            `Lỗi: ${e.message || 'Không thể lấy số lượng thông báo chưa xem'}`,
          );
        });
    },
    {
      enabled: !!(nickname && accessToken),
    },
  );
};
