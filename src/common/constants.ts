export const BASE_URL: string = import.meta.env.VITE_API_URL_PROD;

export const BASE_URL_CRYPTO: string = import.meta.env.VITE_API_URL_CRYPTO;
export const CRYPTOCURRENCY_URL: string = import.meta.env.VITE_API_SOKET;

export const LOCALSTORAGE_KEY_USER = 'user';
export const LOCALSTORAGE_KEY_TOKENS = 'tokens';
export const LOCALSTORAGE_KEY_ID = 'newAccount';
export const PAGE_SIZE = 10;
export const PAGE_SIZE_SM = 3;
export const DOTS = '...';

export const MESSAGES = Object.freeze({
  signUp: {
    success: 'User Register Successfully',
    error: 'Wrong registration data',
  },
  signIn: {
    success: 'User Login Successfully',
    error: 'Invalid email or password',
  },
  validation: {
    name: 'Field must be at least 2 characters',
    email: 'Please enter a valid email address',
    password: 'Password must be at least 8 characters',
    required: {
      name: 'Field is required',
      email: 'Email is required',
      password: 'Password is required',
    },
  },
});

export const API = Object.freeze({
  auth: {
    getUrl: () => 'signin',
  },
  user: {
    getUrl: (id?: string) => `users${id ? `/${id}` : ''}`,
  },
  statistics: {
    getUrl: (id: string) => `users/${id}/statistics`,
  },
});
