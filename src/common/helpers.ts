import { LOCALSTORAGE_KEY_ID } from './constants';

export function safeParse<T>(str: string): T | null {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

export const checkNewRegister = (): string | null => {
  const userId = safeParse<string>(localStorage.getItem(LOCALSTORAGE_KEY_ID) || 'null');

  if (userId) {
    localStorage.removeItem(LOCALSTORAGE_KEY_ID);
    return userId;
  }

  return null;
};
