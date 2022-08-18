export interface IWallet {
  deposit: number;
  withdraw: number;
  total: number;
}

export interface IWalletArgs {
  atribute: string;
  wallet: IWallet;
  values: {
    deposit: number;
    withdraw: number;
  };
}
