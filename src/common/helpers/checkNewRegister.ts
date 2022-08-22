import { LOCALSTORAGE_KEY_ID } from '../constants';

type CheckNewRegister = string | null;

export const checkNewRegister = (userId: CheckNewRegister): CheckNewRegister => {
  if (userId) {
    localStorage.removeItem(LOCALSTORAGE_KEY_ID);
    return userId;
  }

  return null;
};
