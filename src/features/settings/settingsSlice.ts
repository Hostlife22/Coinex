import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app';
import { SettingsNameEnum } from '../../common';
import { has, ISettingsAction, ISettingsState } from './settingsSlice.interface';

export const initialState: ISettingsState = Object.freeze({
  sound: true,
  textbook: {
    isTranslate: true,
    isShowButtons: true,
  },
  sprint: {
    timeGame: 60,
    showHelp: false,
    isEnglishLangWord: true,
  },
  audioCall: {
    countWords: 10,
    countVariants: 5,
    isTranslate: true,
    isEnglishLangWord: true,
  },
});

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<ISettingsAction>) => {
      if (has(action.payload, SettingsNameEnum.SOUND)) state.sound = action.payload.settings;
      if (has(action.payload, SettingsNameEnum.AUDIO)) state.audioCall = action.payload.settings;
      if (has(action.payload, SettingsNameEnum.SPRINT)) state.sprint = action.payload.settings;
      if (has(action.payload, SettingsNameEnum.TEXTBOOK)) state.textbook = action.payload.settings;
    },
    setAllSettings: (state, action: PayloadAction<ISettingsState>) => {
      state = action.payload;
    },
  },
});

export const { setSettings, setAllSettings } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export default settingsSlice.reducer;
