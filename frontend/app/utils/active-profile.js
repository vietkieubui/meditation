import {atom} from 'recoil';

export const activeProfileAtom = atom({
  key: 'ACTIVE_PROFILE',
  default: {
    _id: '',
    name: '',
    phoneNumber: '',
  },
});
