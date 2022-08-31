export interface Data {
  item: string;
  value: number;
  id: string;
}

export interface IOptionData {
  [key: string]: {
    value: number;
    id: string;
  };
}
