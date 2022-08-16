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

export const formatAsPercent = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / 100);
};

export const formatAsCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

export const comparePrice = (a: number, b: number): number => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }

  return 0;
};
