import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IRevenueItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  amount: number;
  priceUsd: string;
  name: string;
  date: string;
  id: string;
  uid: string;
  color?: string;
  handleDelete: (id: string, price: number, priceUsd: string) => void;
  icon?: string;
  index: number;
}
