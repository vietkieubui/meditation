import {getAsyncStorage, setAsyncStorage} from '@utils/helpers';
import {atom, selector} from 'recoil';

const accessTokenAtom = atom({
  key: 'ACCESS_TOKEN_ATOM',
  default: new Promise(resolve => {
    const accessToken = getAsyncStorage('access-token') || null;
    resolve(accessToken);
  }),
});

export const accessTokenState = selector({
  key: 'ACCESS_TOKEN_STATE',

  get: ({get}) => get(accessTokenAtom),

  set: ({set}, newData) => {
    setAsyncStorage('access-token', newData);
    set(accessTokenAtom, newData);
  },
});
