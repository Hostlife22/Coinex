import { LOCALSTORAGE_KEY_ID } from '../constants';
import { safeParse } from './safeParse';

export const checkNewRegister = (): string | null => {
  const userId = safeParse<string>(localStorage.getItem(LOCALSTORAGE_KEY_ID) || 'null');

  if (userId) {
    localStorage.removeItem(LOCALSTORAGE_KEY_ID);
    return userId;
  }

  return null;
};
