import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IGetStatistic } from './statisticApiSlice.interface';
import { IStatisticState } from './statisticSlice.interface';

export const initialState: IStatisticState = Object.freeze({
  transaction: {
    deposit: 0,
    withdraw: 0,
    total: 0,
  },
  history: {
    sales: [],
    purchases: [],
  },
  currency: [],
});

export const statisticsSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setStatistics: (state, action: PayloadAction<IGetStatistic>) => {
      const { transaction, history, currency } = action.payload.optional;
      state.transaction = transaction;
      state.history = history;
      state.currency = currency;
    },
  },
});

export const { setStatistics } = statisticsSlice.actions;

export const selectStatistic = (state: RootState) => state.statistic;

export default statisticsSlice.reducer;
