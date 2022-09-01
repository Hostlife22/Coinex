import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ISettingsPayload, ISettingsState } from './settings.interface';

const initialState: ISettingsState = {
  diff: 0,
  oldPrice: 0,
  currentPrice: 0,
  searchCrypto: '',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSearchCrypto: (state, action: PayloadAction<string>) => {
      state.searchCrypto = action.payload;
    },

    setCryptoDetails: (state, action: PayloadAction<ISettingsPayload>) => {
      state.oldPrice = state.oldPrice + action.payload.oldPrice;
      state.currentPrice = state.currentPrice + action.payload.currentPrice;
      state.diff = ((state.currentPrice - state.oldPrice) / state.oldPrice) * 100;
    },
    resetCryptoDetails: (state) => {
      state.oldPrice = 0;
      state.currentPrice = 0;
      state.diff = 0;
    },
  },
});

export const { setSearchCrypto, setCryptoDetails, resetCryptoDetails } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
