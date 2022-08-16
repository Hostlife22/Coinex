export const BASE_URL: string = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_DEV
  : import.meta.env.VITE_API_URL_DEV;

export const BASE_URL_CRYPTO: string = import.meta.env.VITE_API_URL_CRYPTO;
export const CRYPTOCURRENCY_URL: string = import.meta.env.VITE_API_SOKET;

export const LOCALSTORAGE_KEY_USER = 'user';
export const LOCALSTORAGE_KEY_TOKENS = 'tokens';
export const LOCALSTORAGE_KEY_ID = 'newAccount';
export const PAGE_SIZE = 10;
export const DOTS = '...';

export const API = Object.freeze({
  auth: {
    getUrl: () => 'signin',
  },
});
