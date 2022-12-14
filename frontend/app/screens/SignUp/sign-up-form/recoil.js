import {atom} from 'recoil';

export const validateForm = atom({
  key: 'VALIDATE_FORM',
  default: true,
});

export const validateToggle = atom({
  key: 'VALIDATE_TOGGLE',
  default: false,
});
