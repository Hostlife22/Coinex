import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IRevenueItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  amount: number;
  priceUsd: string;
  name: string;
  date: string;
  uid: string;
  color?: string;
  handleDelete: (id: string, price: number) => void;
  icon?: string;
}
