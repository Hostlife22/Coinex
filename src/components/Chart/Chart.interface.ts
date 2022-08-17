import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ICharData {
  value: string;
  date: string;
}

export interface IChartProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: ICharData[];
}
