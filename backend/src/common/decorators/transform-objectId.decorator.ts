import { Transform } from 'class-transformer';

export const TransformObjectId = () =>
  Transform((value) => {
    if ('value' in value) {
      return value.obj[value.key].toString();
    }
    return '';
  });
