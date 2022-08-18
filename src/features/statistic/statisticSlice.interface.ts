export interface ITransaction {
  deposit: number;
  withdraw: number;
  total: number;
}

export interface ICryptoStatistic {
  id: string;
  amount: number;
  priceUsd: string;
  name: string;
  date: string;
  uid: string;
}
export interface IHistory {
  sales: ICryptoStatistic[];
  purchases: ICryptoStatistic[];
}
export interface IStatisticState {
  transaction: ITransaction;
  history: IHistory;
  currency: ICryptoStatistic[];
}
