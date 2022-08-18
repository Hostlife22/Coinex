import { ICoin } from '../crypto/crypto.interface';

export interface ISettingsState {
  favoriteCurrencies: ICoin[];
  amountUSD: number;
  diff: number;
  searchCrypto: string;
}
