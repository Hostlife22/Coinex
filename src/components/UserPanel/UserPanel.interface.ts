import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IUserPanelProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isLogin?: boolean;
  logOut?: () => void;
}
