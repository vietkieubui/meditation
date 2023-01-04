import API from '@utils/API';
import {useQuery} from 'react-query';

export const useGetMessage = id => {
  return useQuery(['GET_MESSAGE'], () =>
    API.request({
      url: `/message`,
      params: {conversation: id},
    }).then(response => {
      return response?.data || [];
    }),
  );
};
