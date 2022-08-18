import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ISettingsState } from './settings.interface';

const initialState: ISettingsState = {
  favoriteCurrencies: [],
  amountUSD: 0,
  diff: 0,
  searchCrypto: '',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSearchCrypto: (state, action: PayloadAction<string>) => {
      state.searchCrypto = action.payload;
    },
  },
});

export const { setSearchCrypto } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;
export const selectSearchQuery = (state: RootState) => state.settings.searchCrypto;

export default settingsSlice.reducer;
