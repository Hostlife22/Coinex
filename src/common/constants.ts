export const BASE_URL: string = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_DEV
  : import.meta.env.VITE_API_URL_DEV;

export const LOCALSTORAGE_KEY_USER = 'user';
export const LOCALSTORAGE_KEY_TOKENS = 'tokens';
export const LOCALSTORAGE_KEY_ID = 'newAccount';
