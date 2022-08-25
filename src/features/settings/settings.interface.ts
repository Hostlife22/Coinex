import { ICoin } from '../../common/crypto.interface';

export interface ISettingsState {
  favoriteCurrencies: ICoin[];
  amountUSD: number;
  diff: number;
  searchCrypto: string;
}
