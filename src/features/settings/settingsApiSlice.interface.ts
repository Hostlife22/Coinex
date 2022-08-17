import { ISettingsState } from './settingsSlice.interface';

export interface ISettingsResponse {
  wordsPerDay: number;
  optional: ISettingsState;
  id: string;
}

export interface ISettingsRequest {
  userId: string;
  settings: ISettingsState;
}
