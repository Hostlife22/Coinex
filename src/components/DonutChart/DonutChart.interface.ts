import { Data } from '../../pages/Revenue/Revenue.interface';

export interface IDonutChartProps {
  data: Data[];
  total: number;
  cb?: (options: any) => void;
}
export interface IDataEvent {
  data: Data;
  endAngle: number;
  index: number;
  padAngle: number;
  startAngle: number;
  value: number;
}
