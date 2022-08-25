export interface ICoin {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string | null;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

export interface ICryptoHistory {
  priceUsd: string;
  time: number;
}

export interface IGetCryptos {
  assets: ICoin[];
}
export interface IGetCrypto {
  asset: ICoin;
}

export interface IGetCryptoHistory {
  assetHistory: ICryptoHistory[];
}
