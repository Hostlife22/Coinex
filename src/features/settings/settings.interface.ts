export interface ISettingsState {
  diff: number;
  oldPrice: number;
  currentPrice: number;
  searchCrypto: string;
}

export interface ISettingsPayload {
  oldPrice: number;
  currentPrice: number;
}
