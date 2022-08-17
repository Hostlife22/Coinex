import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IData {
  value: string;
  date: string;
}

export interface IChartProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: IData[];
}
