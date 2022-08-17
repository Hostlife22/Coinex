import { SettingsNameEnum } from '../../common';

export interface ISettingsState {
  sound: boolean;
  textbook: ISettingsTextbook;
  sprint: ISettingsSprint;
  audioCall: ISettingsAudioCall;
}

type AudioCallAction = {
  settings: ISettingsAudioCall;
  audioCall: SettingsNameEnum.AUDIO;
};

type SprintAction = {
  settings: ISettingsSprint;
  sprint: SettingsNameEnum.SPRINT;
};

type TextbookAction = {
  settings: ISettingsTextbook;
  textbook: SettingsNameEnum.TEXTBOOK;
};

type SoundAction = {
  settings: boolean;
  sound: SettingsNameEnum.SOUND;
};

export type ISettingsAction = AudioCallAction | SprintAction | TextbookAction | SoundAction;

export interface ISettingsTextbook {
  isTranslate: boolean;
  isShowButtons: boolean;
}

export interface ISettingsAudioCall {
  countWords: number;
  countVariants: number;
  isTranslate: boolean;
  isEnglishLangWord: boolean;
}
export interface ISettingsSprint {
  timeGame: number;
  showHelp: boolean;
  isEnglishLangWord: boolean;
}

export function has<T extends object, K extends PropertyKey>(
  obj: T,
  property: RequireLiteral<K>,
): obj is T & { [P in K]: { [Q in P]: unknown } }[K];
export function has(obj: any, property: PropertyKey): boolean;
export function has(obj: any, property: PropertyKey) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

export type RequireLiteral<K extends PropertyKey> = string extends K
  ? never
  : number extends K
  ? never
  : symbol extends K
  ? never
  : K;
