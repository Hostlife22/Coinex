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

export interface ICryptosResponse {
  data: ICoin[];
  timestamp: number;
}

export interface ICryptoHistory {
  date: Date;
  priceUsd: string;
  time: number;
}

export interface ICryptoHistoryRequest {
  id: string;
  interval?: string;
}

export interface ICryptoHistoryResponse {
  data: ICryptoHistory[];
  timestamp: number;
}

export interface ICryptocoinReaponse {
  data: ICoin;
  timestamp: number;
}
