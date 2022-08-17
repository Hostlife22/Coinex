export const enum StatisticNameEnum {
  SPRINT = 'sprint',
  AUDIOCALL = 'audiocall',
}

export interface IStatistic {
  experience: number;
  name: StatisticNameEnum;
  score: number;
  seriesTrueAnswers: number;
  timeStart: string;
  timeStop: string;
  wordsFalse: string[]; // idwords
  wordsTrue: string[];
}

export interface IPersonStatistic {
  learnedWords: number;
  statistics: IStatistic[];
}

export interface IGetStatisticResponse {
  id: string;
  learnedWords: number;
  optional: {
    statistics: string;
  };
}

export interface IPutStatisticRequest {
  userId: string;
  statistic: IPersonStatistic;
}
