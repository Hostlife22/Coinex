import { IWallet } from '../../pages/Wallet/Wallet.interface';

export interface IWalletArgs {
  atribute: string;
  wallet: IWallet;
  values: {
    deposit: number;
    withdraw: number;
  };
  logger: (message: string) => number | string;
}

export const getNewDeposit = ({ atribute, wallet, values, logger }: IWalletArgs): [IWallet, boolean] => {
  let newData = wallet;
  let isChange = false;

  if (atribute === 'deposit') {
    if (values.deposit <= 0) {
      logger("You can't deposit 0 or less");
    } else {
      newData = {
        ...wallet,
        deposit: wallet.deposit + values.deposit,
        total: wallet.total + values.deposit,
      };
      isChange = true;
    }
  }

  if (atribute === 'withdraw') {
    if (values.withdraw === 0) {
      logger("You don't have any balance to withdraw");
    } else if (values.withdraw > wallet.total) {
      logger("You don't have enough balance to withdraw");
    } else {
      newData = {
        ...wallet,
        withdraw: wallet.withdraw + values.withdraw,
        total: wallet.total - values.withdraw,
      };
      isChange = true;
    }
  }

  return [newData, isChange];
};
