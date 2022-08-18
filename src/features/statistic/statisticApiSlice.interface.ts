import { IStatisticState } from './statisticSlice.interface';

export interface IGetStatisticResponse {
  id: string;
  optional: {
    statistics: string;
  };
}

export interface IGetStatistic {
  id: string;
  optional: IStatisticState;
}

export interface IPutStatisticRequest {
  userId: string;
  statistics: IStatisticState;
}
