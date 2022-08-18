import { toast } from 'react-toastify';
import { IWallet, IWalletArgs } from '../pages/Wallet/Wallet.interface';
import { LOCALSTORAGE_KEY_ID } from './constants';

export function safeParse<T>(str: string): T | null {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

export const checkNewRegister = (): string | null => {
  const userId = safeParse<string>(localStorage.getItem(LOCALSTORAGE_KEY_ID) || 'null');

  if (userId) {
    localStorage.removeItem(LOCALSTORAGE_KEY_ID);
    return userId;
  }

  return null;
};

export const formatAsPercent = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num / 100);
};

export const formatAsCurrency = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

export const comparePrice = (a: number, b: number): number => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }

  return 0;
};

export function incrementChar(number: number): string {
  const inc = String(number)
    .replace(/\d/g, '0')
    .replace(/(.*)\d/, '$11');
  const newNumber = Number(number) - Number(inc);

  return newNumber.toFixed(2);
}

export const getNewDeposit = ({ atribute, wallet, values }: IWalletArgs): [IWallet, boolean] => {
  let newData = wallet;
  let isChange = false;

  if (atribute === 'deposit') {
    if (values.deposit <= 0) {
      toast.error("You can't deposit 0 or less");
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
      toast.error("You don't have any balance to withdraw");
    } else if (values.withdraw > wallet.total) {
      toast.error("You don't have enough balance to withdraw");
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
