import API from '@utils/API';
import {useMutation} from 'react-query';

export const useMutationPushChat = id => {
  return useMutation(
    content => {
      const config = {
        method: 'POST',
        url: `/message`,
        params: {
          content,
          conversation: id,
        },
      };
      return API.request(config);
    },
    {
      onSuccess: () => {},
      onError: error => {},
    },
  );
};
