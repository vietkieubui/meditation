import API from '@utils/API';
import {useQuery} from 'react-query';

export const useGetConversation = () => {
  return useQuery(['GET_CONVERSATION'], () =>
    API.request({
      url: `/conversation`,
    }).then(response => {
      return response?.data || [];
    }),
  );
};
