import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LOCALSTORAGE_KEY_ID, LOCALSTORAGE_KEY_USER } from '../../common/constants';
import { IAuthPayload, IAuthState, IAuthTokens } from './auth.interface';

const initialState: IAuthState = {
  user: {
    firstName: null,
    lastName: null,
    phone: null,
    userId: null,
  },
  tokens: {
    token: null,
    refreshToken: null,
  },
  newAccount: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthPayload>) => {
      const { token, refreshToken, ...user } = action.payload;

      localStorage.setItem(LOCALSTORAGE_KEY_USER, JSON.stringify(action.payload));

      state.tokens = { token, refreshToken };
      state.user = user;
    },
    setNewUserId: (state, action: PayloadAction<string>) => {
      localStorage.setItem(LOCALSTORAGE_KEY_ID, JSON.stringify(action.payload));

      state.newAccount = true;
    },
    logout: (state) => {
      localStorage.removeItem(LOCALSTORAGE_KEY_USER);

      return initialState;
    },
    updateUserTokens: (state, action: PayloadAction<IAuthTokens>) => {
      state.tokens = action.payload;

      localStorage.setItem(
        LOCALSTORAGE_KEY_USER,
        JSON.stringify({
          ...action.payload,
          ...state.user,
        }),
      );
    },
  },
});

export const { setUser, logout, updateUserTokens, setNewUserId } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
